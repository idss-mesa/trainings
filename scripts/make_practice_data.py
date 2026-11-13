"""Generate the synthetic practice data in docs/assets/practice/.

Five invented rain gauges with invented coordinates, daily readings for July 2026,
and one week of hourly observations from one of the gauges. The data describes no
real place or measurement. It is deliberately imperfect (one gauge reports in a
different unit, some readings are flagged, one row is repeated, some days are
missing) so that the data tutorials have something to find. The seed is fixed,
so every run writes identical files.

Usage: python scripts/make_practice_data.py
"""
import csv
import datetime as dt
import math
import random
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "docs" / "assets" / "practice"

GAUGES = [
    # gauge_id, name, unit, elevation_m, catch factor
    ("G01", "Boathouse", "mm", 512, 0.95),
    ("G02", "Orchard", "cm", 540, 1.10),
    ("G03", "Observatory", "mm", 688, 1.25),
    ("G04", "Depot", "mm", 521, 1.00),
    ("G05", "Quarry", "mm", 603, 1.05),
]
# Invented coordinates (longitude, latitude, WGS 84). They mark no real instruments.
SITES = {
    "G01": (-104.7612, 47.1034),
    "G02": (-104.7391, 47.1108),
    "G03": (-104.7228, 47.1287),
    "G04": (-104.7533, 47.1175),
    "G05": (-104.7306, 47.0962),
}
DAYS = [dt.date(2026, 7, 1) + dt.timedelta(days=n) for n in range(31)]
MISSING = {"G01": set(DAYS[21:25])}          # days with no row at all
SUSPECT = {("G05", DAYS[8]): 180.0,          # flagged, and far out of range
           ("G03", DAYS[17]): None}          # flagged, value left as it is
REPEATED = ("G03", DAYS[4])                  # this row is written twice


def main() -> None:
    rng = random.Random(4172026)
    storm = {d: rng.choice([0, 0, 0, 0, 0, 1, 3, 5, 8, 12, 18, 26]) for d in DAYS}
    storm[REPEATED[1]] = 18                  # make sure the repeated row is a wet day
    rows = []
    for gauge_id, _name, unit, _elev, factor in GAUGES:
        for day in DAYS:
            if day in MISSING.get(gauge_id, ()):
                continue
            mm = 0.0
            if storm[day]:
                mm = max(0.0, round(storm[day] * factor + rng.uniform(-0.6, 0.6), 1))
            flag = ""
            if (gauge_id, day) in SUSPECT:
                flag = "S"
                if SUSPECT[(gauge_id, day)] is not None:
                    mm = SUSPECT[(gauge_id, day)]
            value = round(mm / 10, 2) if unit == "cm" else mm
            row = [gauge_id, day.isoformat(), value, flag]
            rows.append(row)
            if (gauge_id, day) == REPEATED:
                rows.append(list(row))
    OUT.mkdir(parents=True, exist_ok=True)
    with open(OUT / "gauges.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["gauge_id", "name", "unit", "elevation_m"])
        w.writerows(g[:4] for g in GAUGES)
    with open(OUT / "readings.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["gauge_id", "date", "value", "flag"])
        w.writerows(rows)
    with open(OUT / "gauge_sites.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["gauge_id", "longitude", "latitude"])
        w.writerows([g, lon, lat] for g, (lon, lat) in SITES.items())
    print(f"gauges.csv: {len(GAUGES)} rows; readings.csv: {len(rows)} rows; gauge_sites.csv: {len(SITES)} rows")
    write_observations(rows)


def write_observations(daily_rows) -> None:
    """Hourly observations for one gauge and one week, in long format.

    One row per hour and per kind of measurement, time-stamped in UTC. The campus
    keeps US Mountain Time (UTC-6 in July), and most rain falls in the evening, so
    a day's rain straddles midnight UTC. Summed by local day, the hourly rain
    equals that gauge's daily values in readings.csv.
    """
    gauge_id, first, n_days, utc_offset = "G03", dt.date(2026, 7, 10), 7, -6
    rng = random.Random(7102026)             # separate stream: readings.csv is unchanged
    daily = {r[1]: r[2] for r in daily_rows if r[0] == gauge_id}
    out = []
    for n in range(n_days):
        day = first + dt.timedelta(days=n)
        tenths = round(daily[day.isoformat()] * 10)
        rain = [0] * 24
        if tenths:
            start = rng.randint(17, 20)
            hours = list(range(start, min(start + rng.randint(3, 4), 24)))
            weights = [rng.uniform(0.5, 1.5) for _ in hours]
            for h, w in zip(hours, weights):
                rain[h] = int(tenths * w / sum(weights))
            rain[hours[0]] += tenths - sum(rain)
        for hour in range(24):
            local = dt.datetime(day.year, day.month, day.day, hour)
            stamp = (local - dt.timedelta(hours=utc_offset)).strftime("%Y-%m-%dT%H:%M:%SZ")
            temp = 18 + 7 * math.sin((hour - 9) / 24 * 2 * math.pi) + rng.uniform(-0.8, 0.8)
            out.append([gauge_id, stamp, "rain_mm", rain[hour] / 10])
            out.append([gauge_id, stamp, "air_temp_c", round(temp, 1)])
    with open(OUT / "observations.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["gauge_id", "timestamp_utc", "measurement", "value"])
        w.writerows(out)
    print(f"observations.csv: {len(out)} rows")


if __name__ == "__main__":
    main()
