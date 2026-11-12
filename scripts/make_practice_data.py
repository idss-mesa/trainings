"""Generate the synthetic practice data in docs/assets/practice/.

Five invented rain gauges, daily readings for July 2026. The data describes no
real place or measurement. It is deliberately imperfect (one gauge reports in a
different unit, some readings are flagged, one row is repeated, some days are
missing) so that the data tutorials have something to find. The seed is fixed,
so every run writes identical files.

Usage: python scripts/make_practice_data.py
"""
import csv
import datetime as dt
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
    print(f"gauges.csv: {len(GAUGES)} rows; readings.csv: {len(rows)} rows")


if __name__ == "__main__":
    main()
