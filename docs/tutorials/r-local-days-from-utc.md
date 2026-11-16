---
type: Guide
title: "Turn UTC timestamps into local days in R"
description: "Read UTC timestamps as times in R, total hourly rain by UTC date and by local date, and confirm that only the local days match the gauge's daily record."
tags: [byte, p2, rstudio, r, time-zones]
status: draft
generated: { by: "claude-code/2.1.321", at: "2026-11-16T00:00:00Z" }
stale_after: "2027-05-16T00:00:00Z"
sources:
  - id: docs-rstudio
    resource: "https://idss-mesa.github.io/docs/apps/rstudio/"
    title: "MESA RStudio Geospatial"
    author: "team:idss-mesa"
  - id: r
    resource: "https://stat.ethz.ch/R-manual/R-devel/library/base/html/as.POSIXlt.html"
    title: "Date-time Conversion Functions: as.POSIXct (R documentation)"
    author: "team:r-core"
---

# Turn UTC timestamps into local days in R

!!! warning "Draft: not yet validated"
    The code on this page was run inside MESA RStudio Geospatial on 2026-11-16 (R 4.6.2),
    by the AI assistant that drafted it, and produced the output shown. No person has
    yet followed the steps, so a screen may differ.
    [Tell us what you find](https://github.com/idss-mesa/trainings/issues).

Instruments usually record time in UTC. A "day" of UTC is not a day where the
instrument stands: on the invented campus, which keeps US Mountain Time, the UTC date
changes at six in the evening in July. Evening rain lands on the wrong day unless you
convert first.

**You will:** have daily rain totals by local day that match the gauge's daily record.

**Time:** 10 minutes. **You need:** the `readings` and `gauges` tables from
[Load a file from your Data Store in RStudio](r-load-a-file.md), in
[MESA RStudio Geospatial](map-points-in-rstudio.md).

## Steps

1. In the **Console**, fetch the hourly observations into your practice folder:

    ```r
    download.file("https://idss-mesa.github.io/trainings/assets/practice/observations.csv", "observations.csv")
    ```

    You should see: a line that reads `downloaded 13 KB`.

2. Read the file and check its size:

    ```r
    obs <- read.csv("observations.csv")
    dim(obs)
    ```

    You should see:

    ```text
    [1] 336   4
    ```

3. Keep the rain rows and turn the text timestamps into real times. Say that they are
   UTC; the trailing `Z` in the file means so, but R does not read it:

    ```r
    rain <- obs[obs$measurement == "rain_mm", ]
    rain$time_utc <- as.POSIXct(rain$timestamp_utc, format = "%Y-%m-%dT%H:%M:%SZ", tz = "UTC")
    attr(rain$time_utc, "tzone")
    ```

    You should see:

    ```text
    [1] "UTC"
    ```

4. Total the rain by UTC date:

    ```r
    rain$day_utc <- format(rain$time_utc, "%Y-%m-%d")
    aggregate(value ~ day_utc, data = rain, FUN = sum)
    ```

    You should see: eight dates for a seven-day week, the first sign of trouble.

    ```text
         day_utc value
    1 2026-07-10   0.0
    2 2026-07-11  32.4
    3 2026-07-12   7.4
    4 2026-07-13  17.6
    5 2026-07-14   4.4
    6 2026-07-15  22.1
    7 2026-07-16   1.7
    8 2026-07-17   0.0
    ```

5. Write each time as a date in the local zone, and total again:

    ```r
    rain$day_local <- format(rain$time_utc, "%Y-%m-%d", tz = "America/Denver")
    aggregate(value ~ day_local, data = rain, FUN = sum)
    ```

    You should see: seven dates, and different totals.

    ```text
       day_local value
    1 2026-07-10  32.4
    2 2026-07-11   0.0
    3 2026-07-12  23.0
    4 2026-07-13   6.4
    5 2026-07-14  22.1
    6 2026-07-15   1.7
    7 2026-07-16   0.0
    ```

6. Compare with the same gauge's daily record:

    ```r
    week <- readings$date >= "2026-07-10" & readings$date <= "2026-07-16"
    readings[readings$gauge_id == "G03" & week, c("date", "value")]
    ```

    You should see: the seven totals from step 5, not those from step 4.

    ```text
             date value
    69 2026-07-10  32.4
    70 2026-07-11   0.0
    71 2026-07-12  23.0
    72 2026-07-13   6.4
    73 2026-07-14  22.1
    74 2026-07-15   1.7
    75 2026-07-16   0.0
    ```

## Check it worked

Your local-day totals equal the daily values in `readings.csv` for G03, day for day.
`sum(rain$value)` is 85.6 either way; only the days it falls on change.

## If it didn't

**The totals in step 4 already look like local days, or are off by hours.** You left
out `tz = "UTC"` in step 3. R then takes the times to be in the app's own zone, which
in MESA RStudio Geospatial is not UTC, and gives no warning. Run step 3 again as
written.

**Every `time_utc` is `NA`.** The `format` does not match the text. It must describe
the timestamp exactly, including the `T` between date and time and the `Z` at the end.

## Next

- [Work with a long table in R](r-work-with-a-long-table.md), which uses the same file.
- [Count records per day in R](r-count-records-per-day.md)
- The same task in Python: [Turn UTC timestamps into local days](local-days-from-utc.md).

*Not yet validated by a person in MESA RStudio Geospatial. Drafted with [AI assistance](../about/ai-disclosure.md) on 2026-11-16; the code was run there that day (R 4.6.2).*
