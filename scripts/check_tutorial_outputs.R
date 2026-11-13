# Check that the output printed in each R tutorial is what its code produces.
#
# For every tutorial under docs/tutorials/, runs each ```r block in page order
# against a copy of the practice data and compares what it prints with the
# ```text block that follows it. Blocks that set the working folder or download
# files are skipped. Run it in the MESA RStudio Geospatial image, or the
# comparison may fail on layout alone:
#   harbor.cyverse.org/vice/mesa-rstudio:latest
#
# Usage: Rscript scripts/check_tutorial_outputs.R   (exit status 1 on any mismatch)

args <- commandArgs(trailingOnly = FALSE)
script <- sub("^--file=", "", args[grep("^--file=", args)])
root <- normalizePath(file.path(dirname(script), ".."))
tutorials <- file.path(root, "docs", "tutorials")
practice <- file.path(root, "docs", "assets", "practice")
skip <- c("setwd(", "download.file(", "<your username>")

work <- tempfile("practice")
dir.create(work)
invisible(file.copy(list.files(practice, pattern = "[.]csv$", full.names = TRUE), work))
setwd(work)

tidy <- function(lines) {
  lines <- sub("[ \t]+$", "", lines)
  lines[nzchar(lines)]
}
dedent <- function(lines) sub("^    ", "", lines)

compared <- 0L
failed <- 0L
for (page in sort(list.files(tutorials, pattern = "[.]md$", full.names = TRUE))) {
  lines <- readLines(page, warn = FALSE)
  starts <- which(lines == "    ```r")
  if (!length(starts)) next
  env <- new.env()
  assign("readings", read.csv("readings.csv", na.strings = ""), envir = env)
  assign("gauges", read.csv("gauges.csv"), envir = env)
  fences <- which(lines == "    ```")
  breaks <- c(grep("^[0-9]+[.] |^## ", lines), length(lines) + 1L)
  for (s in starts) {
    e <- fences[fences > s][1]
    code <- dedent(lines[(s + 1L):(e - 1L)])
    if (any(vapply(skip, function(k) any(grepl(k, code, fixed = TRUE)), logical(1)))) next
    stop_at <- breaks[breaks > e][1]
    tail_lines <- lines[(e + 1L):(stop_at - 1L)]
    t0 <- which(tail_lines == "    ```text")[1]
    expected <- NULL
    if (!is.na(t0)) {
      t1 <- which(tail_lines == "    ```")
      t1 <- t1[t1 > t0][1]
      expected <- tidy(dedent(tail_lines[(t0 + 1L):(t1 - 1L)]))
    }
    produced <- tryCatch(
      tidy(capture.output(suppressMessages(suppressWarnings(
        for (expr in parse(text = code)) {
          value <- withVisible(eval(expr, envir = env))
          if (value$visible) print(value$value)
        }
      )))),
      error = function(err) paste("ERROR:", conditionMessage(err))
    )
    if (length(produced) && any(grepl("^ERROR:", produced))) {
      failed <- failed + 1L
      cat("ERROR in", basename(page), "\n", paste(code, collapse = "\n"), "\n", produced, "\n\n")
      next
    }
    if (is.null(expected)) next
    compared <- compared + 1L
    if (!identical(produced, expected)) {
      failed <- failed + 1L
      cat("MISMATCH in", basename(page), ":", code[length(code)], "\n--- produced\n",
          paste(produced, collapse = "\n"), "\n--- on the page\n",
          paste(expected, collapse = "\n"), "\n\n", sep = "")
    }
  }
}
cat("Compared", compared, "R outputs in docs/tutorials:", failed, "problem(s).\n")
quit(status = if (failed) 1L else 0L)
