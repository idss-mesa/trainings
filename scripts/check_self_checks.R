# Check the self-checks that are answered in R against the practice data.
#
# Reads docs/assets/pathways.json (written by scripts/gen_pathways.py from
# data/pathways.yml), and for every self-check with `verify: r:` evaluates that
# expression against the practice data and compares it with the stated answer.
# The Python ones are checked by scripts/check_self_checks.py. Needs jsonlite.
#
# Usage: Rscript scripts/check_self_checks.R   (exit status 1 on any mismatch)

args <- commandArgs(trailingOnly = FALSE)
script <- sub("^--file=", "", args[grep("^--file=", args)])
root <- normalizePath(file.path(dirname(script), ".."))
practice <- file.path(root, "docs", "assets", "practice")
checks <- jsonlite::fromJSON(file.path(root, "docs", "assets", "pathways.json"),
                             simplifyVector = FALSE)$checks

work <- tempfile("practice")
dir.create(work)
invisible(file.copy(list.files(practice, pattern = "[.]csv$", full.names = TRUE), work))
setwd(work)

compared <- 0L
failed <- 0L
for (id in names(checks)) {
  code <- checks[[id]]$verify$r
  if (is.null(code)) next
  env <- new.env()
  assign("readings", read.csv("readings.csv", na.strings = ""), envir = env)
  assign("gauges", read.csv("gauges.csv"), envir = env)
  value <- tryCatch(eval(parse(text = code), envir = env),
                    error = function(err) paste("ERROR:", conditionMessage(err)))
  answer <- checks[[id]]$answer
  same <- isTRUE(all.equal(suppressWarnings(as.numeric(value)), suppressWarnings(as.numeric(answer)))) ||
    identical(as.character(value), as.character(answer))
  compared <- compared + 1L
  if (!same) {
    failed <- failed + 1L
    cat("MISMATCH in ", id, ": the data gives ", format(value), ", the answer says ", answer, "\n", sep = "")
  }
}
cat("Compared", compared, "self-check answers in R with the practice data:", failed, "mismatch(es).\n")
quit(status = if (failed) 1L else 0L)
