"""End-to-end runs of the learning pathways in a real browser.

One run follows a pathway with scripts on: two clicks to the first tutorial,
mark tutorials done, reload, export, clear, import, and compare. One run does
the same reading with JavaScript disabled. Both run against the built site.

    zensical build --clean --strict && python scripts/postbuild_agent_surface.py site
    pip install playwright && playwright install chromium
    python tests/e2e/test_browser.py

Set MESA_SHOTS to a folder to save screenshots along the way.
"""
import functools
import http.server
import json
import os
import threading
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / "site"
SHOTS = os.environ.get("MESA_SHOTS")
KEY = "mesa-trainings"


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Browser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (SITE / "index.html").exists():
            raise unittest.SkipTest("build the site first: zensical build --clean --strict")
        handler = functools.partial(Quiet, directory=str(SITE))
        cls.server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.base = f"http://127.0.0.1:{cls.server.server_address[1]}/"
        cls.play = sync_playwright().start()
        cls.chromium = cls.play.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.chromium.close()
        cls.play.stop()
        cls.server.shutdown()

    def shot(self, page, name, full=True):
        if SHOTS:
            Path(SHOTS).mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(Path(SHOTS) / f"{name}.png"), full_page=full)

    def arrive(self, page, url, heading):
        """Wait for an in-site navigation: the address changes before the page is swapped in."""
        page.wait_for_url(url)
        page.locator("article h1", has_text=heading).wait_for()

    def stored(self, page):
        return page.evaluate(f"localStorage.getItem('{KEY}')")

    def test_follow_a_pathway_with_scripts_on(self):
        context = self.chromium.new_context(viewport={"width": 1280, "height": 900}, accept_downloads=True)
        page = context.new_page()
        requests = []
        page.on("request", lambda r: requests.append(r))
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        # Two clicks from the home page to the first tutorial, on a route that states its time.
        page.goto(self.base)
        page.get_by_role("link", name="New to MESA? Start here").click()
        self.arrive(page, "**/pathways/new-to-mesa/", "New to MESA")
        self.assertIn("The essentials: 3 tutorials, 15 to 25 minutes in all", page.inner_text("article"))
        page.locator(".mesa-continue .mesa-btn").wait_for()
        self.assertIn("You have not started", page.inner_text(".mesa-story"))
        self.shot(page, "01-pathway-not-started")
        page.locator(".mesa-continue .mesa-btn").click()
        self.arrive(page, "**/tutorials/sign-in/", "Sign in to the MESA Portal")

        # Mark it done with the keyboard; focus stays in the strip and the result is announced.
        mark = page.get_by_role("button", name="Mark as done")
        mark.wait_for()
        self.assertIn("New to MESA", page.inner_text(".mesa-where"))
        mark.focus()
        page.keyboard.press("Enter")
        page.get_by_role("button", name="Undo").wait_for()
        self.assertEqual(page.evaluate("document.activeElement.textContent"), "Undo")
        page.wait_for_function("document.getElementById('mesa-live').textContent.startsWith('Marked as done')")
        self.assertIn("You set out to be signed in", page.inner_text(".mesa-strip"))
        self.shot(page, "02-tutorial-marked-done")

        # The next step is one click away, by in-site navigation, and the script runs again there.
        page.locator(".mesa-strip__next a").first.click()
        self.arrive(page, "**/tutorials/launch-jupyterlab/", "Launch MESA JupyterLab")
        page.get_by_role("button", name="Mark as done").click()
        page.get_by_role("button", name="Undo").wait_for()
        self.assertTrue(page.locator("a.md-nav__link .mesa-nav-tick").count() >= 2)

        # Progress survives a reload and shows on the pathway, with what was accomplished.
        page.goto(self.base + "pathways/new-to-mesa/")
        page.locator(".mesa-story").wait_for()
        self.assertIn("2 of 3 done", page.inner_text(".mesa-story"))
        self.assertEqual(page.locator(".mesa-stop.is-done").count(), 2)
        self.assertEqual(page.locator(".mesa-stop.is-next").count(), 1)
        self.assertEqual(page.locator(".mesa-stop.is-done .mesa-did").count(), 2)
        page.locator(".mesa-did > summary").first.click()
        self.shot(page, "03-pathway-in-progress")
        page.reload()
        page.locator(".mesa-story").wait_for()
        self.assertIn("2 of 3 done", page.inner_text(".mesa-story"))

        # A tutorial revised after it was finished says so and keeps its tick.
        page.evaluate(f"""() => {{ const r = JSON.parse(localStorage.getItem('{KEY}'));
            r.tutorials['sign-in'].rev = '2026-01-01T00:00:00Z';
            localStorage.setItem('{KEY}', JSON.stringify(r, null, 1)); }}""")
        page.reload()
        page.locator(".mesa-story").wait_for()
        self.assertIn("Updated since you finished", page.inner_text(".mesa-stop.is-done >> nth=0"))
        self.assertEqual(page.locator(".mesa-stop.is-done").count(), 2)

        # The lists of everything are drawn as paths too.
        page.goto(self.base + "tutorials/")
        page.locator(".mesa-stage").first.wait_for()
        self.assertEqual(page.locator(".mesa-stage").count(), 5)
        self.assertEqual(page.locator(".mesa-stop").count(), 51)
        visible = page.locator(".mesa-stage >> nth=0").locator(".mesa-stop:visible").count()
        self.assertLessEqual(visible, 7)
        self.shot(page, "04-all-tutorials")

        # Export, clear, import: the record comes back exactly.
        page.goto(self.base + "progress/")
        page.get_by_role("button", name="Save a copy to a file").wait_for()
        self.shot(page, "05-progress-page")
        before = self.stored(page)
        self.assertEqual(len(json.loads(before)["tutorials"]), 2)
        with page.expect_download() as download:
            page.get_by_role("button", name="Save a copy to a file").click()
        saved = Path(download.value.path())
        self.assertEqual(saved.read_text(encoding="utf-8").strip(), before)
        page.get_by_role("button", name="Clear everything").click()
        page.locator(".mesa-ask").get_by_role("button", name="Clear everything").click()
        page.wait_for_function(f"localStorage.getItem('{KEY}') === null")
        self.assertIn("0 of 3 done", page.inner_text(".mesa-routes"))
        with page.expect_file_chooser() as chooser:
            page.get_by_role("button", name="Bring back a saved copy").click()
        chooser.value.set_files(str(saved))
        page.wait_for_function(f"localStorage.getItem('{KEY}') !== null")
        self.assertEqual(self.stored(page), before)
        self.assertIn("2 of 3 done", page.inner_text(".mesa-routes"))

        # A file that is not a progress record changes nothing.
        bad = saved.with_name("bad.json")
        bad.write_text('{"schema": 1, "tutorials": {"x": {"done": "soon", "rev": ""}}}', encoding="utf-8")
        with page.expect_file_chooser() as chooser:
            page.get_by_role("button", name="Bring back a saved copy").click()
        chooser.value.set_files(str(bad))
        page.locator(".mesa-said", has_text="Nothing was changed").wait_for()
        self.assertEqual(self.stored(page), before)

        # A level is the reader's own assessment, and it is kept.
        page.locator("input[name='mesa-level-p1'][value='exploring']").check()
        self.assertEqual(json.loads(self.stored(page))["points"]["p1"]["level"], "exploring")

        # Nothing about the reader left the browser: every request is a plain GET
        # for a static file, with no body, and none mentions the record.
        self.assertTrue(requests)
        for request in requests:
            self.assertEqual(request.method, "GET", request.url)
            self.assertIsNone(request.post_data, request.url)
            if request.url.startswith(self.base):
                self.assertNotIn("?", request.url, request.url)
        self.assertEqual(errors, [])
        context.close()

    def test_self_checks_skip_check_and_reflection(self):
        context = self.chromium.new_context(viewport={"width": 1280, "height": 900}, accept_downloads=True)
        page = context.new_page()
        requests = []
        page.on("request", lambda r: requests.append(r))
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        # A wrong answer names the slip and links back; nothing is marked.
        page.goto(self.base + "tutorials/count-records-per-day/")
        box = page.locator(".mesa-strip .mesa-check")
        box.wait_for()
        box.locator(".mesa-check__input").fill("152")
        box.get_by_label("Fairly sure").check()
        box.get_by_role("button", name="Check answer").click()
        wrong = box.locator(".mesa-check__result.is-wrong")
        wrong.wait_for()
        self.assertIn("Not yet. That is the table as loaded", wrong.inner_text())
        self.assertIn("#steps", wrong.locator("a").get_attribute("href"))
        record = json.loads(self.stored(page))
        self.assertEqual(record["checks"]["rows-without-repeats"], {"correct": False, "tries": 1, "sure": 3, "on": record["checks"]["rows-without-repeats"]["on"]})
        self.assertEqual(record["tutorials"], {})
        self.shot(page, "08-self-check-wrong", full=False)

        # Seeing the answer does not count.
        box.get_by_role("button", name="Show the answer").click()
        page.locator(".mesa-check__result", has_text="The answer is 151").wait_for()
        self.assertEqual(json.loads(self.stored(page))["tutorials"], {})

        # The right answer, by keyboard, marks the tutorial checked.
        field = page.locator(".mesa-strip .mesa-check__input")
        field.fill("151")
        field.press("Enter")
        right = page.locator(".mesa-check.is-right .mesa-check__result")
        right.wait_for()
        self.assertIn("Right: 151", right.inner_text())
        page.wait_for_function("document.getElementById('mesa-live').textContent.startsWith('Right.')")
        record = json.loads(self.stored(page))
        self.assertTrue(record["checks"]["rows-without-repeats"]["correct"])
        self.assertEqual(record["checks"]["rows-without-repeats"]["tries"], 2)
        self.assertIn("checked", record["tutorials"]["count-records-per-day"])
        self.shot(page, "09-self-check-right", full=False)

        # On a pathway the tutorial now reads "Checked", and the point offers a skip-check.
        page.goto(self.base + "pathways/check-a-dataset/")
        page.locator(".mesa-story").wait_for()
        stage = page.locator(".mesa-stage >> nth=0")
        stage.locator("details.mesa-more:not([class*='-fold']) > summary", has_text="If you have more time").click()
        self.assertEqual(page.locator(".mesa-stop.is-checked .mesa-state").inner_text(), "Checked")
        stage.locator(".mesa-skip__fold > summary").click()
        forms = stage.locator(".mesa-skip .mesa-check")
        self.assertEqual(forms.count(), 3)
        # One question was already answered on its tutorial. Miss one, then get both right.
        zero = stage.locator(".mesa-skip .mesa-check", has_text="exactly 0")
        zero.locator(".mesa-check__input").fill("150")
        zero.get_by_role("button", name="Check answer").click()
        said = stage.locator(".mesa-skip__said")
        said.wait_for()
        self.assertIn("Not yet. This tutorial covers it: Check a column's range and missing values.", said.inner_text())
        self.assertTrue(stage.locator(".mesa-skip__fold").evaluate("d => d.open"))
        zero = stage.locator(".mesa-skip .mesa-check", has_text="exactly 0")
        zero.locator(".mesa-check__input").fill("80")
        zero.get_by_role("button", name="Check answer").click()
        largest = stage.locator(".mesa-skip .mesa-check", has_text="flagged readings")
        largest.locator(".mesa-check__input").fill("32.5")
        largest.get_by_role("button", name="Check answer").click()
        page.locator(".mesa-skip__said", has_text="You already have this").wait_for()
        self.assertIn("Skip-check passed", stage.locator(".mesa-meter").inner_text())
        # The two tutorials whose questions were answered stay and count as checked;
        # the other essentials leave the route, named, not hidden or ticked.
        self.assertIn("2 of 2 done. Point finished. Skip-check passed.", stage.locator(".mesa-meter").inner_text())
        self.assertIn("all 2 tutorials are marked done", page.inner_text(".mesa-story"))
        self.assertIn("Shortened for you: 3 left out", page.inner_text(".mesa-tailored"))
        self.assertEqual(stage.locator(".mesa-stop.is-off").count(), 3)
        self.assertIn("Left out because you passed the skip-check", stage.locator(".mesa-stop.is-off >> nth=0").inner_text())
        record = json.loads(self.stored(page))
        self.assertIn("skipped", record["points"]["p2"])
        self.assertNotIn("practice-data", record["tutorials"])
        self.shot(page, "10-skip-check-passed")

        # A reflection is the reader's own: typed, kept here, and exported as Markdown.
        stage.locator(".mesa-reflect-fold > summary").click()
        area = stage.locator("textarea")
        area.fill("I would check the units first.")
        area.blur()
        page.wait_for_function(f"(JSON.parse(localStorage.getItem('{KEY}')).points.p2 || {{}}).reflection === 'I would check the units first.'")
        page.goto(self.base + "progress/")
        page.get_by_role("button", name="Save my notes as Markdown").wait_for()
        self.assertEqual(page.locator("#mesa-reflect-p2-p").input_value(), "I would check the units first.")
        with page.expect_download() as download:
            page.get_by_role("button", name="Save my notes as Markdown").click()
        notes = Path(download.value.path()).read_text(encoding="utf-8")
        self.assertIn("**What would you check first if this result looked wrong?**\n\nI would check the units first.", notes)
        self.assertIn("- Checked: Count records per day to find incomplete days", notes)
        self.assertIn("- Passed the skip-check on", notes)
        self.shot(page, "11-progress-with-checks")

        # "Clear everything" forgets an answer given on this visit too: without a
        # reload in between, the self-check is asked again, not shown as right.
        page.locator('.md-content a[href*="pathways/check-a-dataset/"]').first.click()
        self.arrive(page, self.base + "pathways/check-a-dataset/", "Check a dataset")
        page.locator('.mesa-stop a[href*="tutorials/load-a-file/"]').first.click()
        self.arrive(page, self.base + "tutorials/load-a-file/", "Load a file")
        check = page.locator(".mesa-strip .mesa-check")
        check.get_by_label("G05, 2026-07-31").check()
        check.get_by_role("button", name="Check answer").click()
        page.locator(".mesa-strip .mesa-check.is-right").wait_for()
        page.locator(".mesa-strip__next a", has_text="Your progress").click()
        page.wait_for_url(self.base + "progress/")
        page.get_by_role("button", name="Clear everything").click()
        page.locator(".mesa-ask").get_by_role("button", name="Clear everything").click()
        page.wait_for_function(f"localStorage.getItem('{KEY}') === null")
        page.locator('.md-content a[href*="pathways/check-a-dataset/"]').first.click()
        self.arrive(page, self.base + "pathways/check-a-dataset/", "Check a dataset")
        page.locator('.mesa-stop a[href*="tutorials/load-a-file/"]').first.click()
        self.arrive(page, self.base + "tutorials/load-a-file/", "Load a file")
        page.locator(".mesa-strip .mesa-check").get_by_role("button", name="Check answer").wait_for()
        self.assertEqual(page.locator(".mesa-strip .mesa-check.is-right").count(), 0)
        self.assertNotIn("Right:", page.inner_text(".mesa-strip"))

        for request in requests:
            self.assertEqual(request.method, "GET", request.url)
            self.assertIsNone(request.post_data, request.url)
            if request.url.startswith(self.base):
                self.assertNotIn("?", request.url, request.url)
        self.assertEqual(errors, [])
        context.close()

    def test_a_route_tailored_to_the_reader(self):
        context = self.chromium.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(self.base + "pathways/")
        start = page.locator(".mesa-start")
        start.wait_for()
        self.assertIn("Choose what brings you here", start.inner_text())

        # A goal alone gives the essentials: four tutorials, 20 to 25 minutes.
        start.get_by_label("Get ready for a hands-on session").check()
        story = page.locator(".mesa-yours .mesa-story")
        page.locator(".mesa-yours .mesa-story", has_text="4 tutorials, 20 to 25 minutes").wait_for()
        self.assertEqual(page.locator(".mesa-yours__list > li").count(), 4)
        self.shot(page, "13-starting-questions")

        # Answering keeps keyboard focus where it was, and announces the new route.
        used = start.locator("input[name='mesa-start-portal'][value='yes']")
        used.focus()
        page.keyboard.press("Space")
        page.locator(".mesa-yours .mesa-story", has_text="2 tutorials, 10 minutes").wait_for()
        self.assertTrue(used.evaluate("e => document.activeElement === e"))
        page.wait_for_function("document.getElementById('mesa-live').textContent.includes('2 tutorials, 10 minutes')")
        self.assertIn("Shortened for you: 2 left out", page.inner_text(".mesa-yours"))
        self.assertIn("Practice data", page.inner_text(".mesa-continue"))

        # Working in R swaps in the R tutorial and drops what R does not need.
        start.locator("input[name='mesa-start-language'][value='r']").check()
        page.locator(".mesa-yours .mesa-story", has_text="1 tutorial, 5 to 10 minutes").wait_for()
        self.assertIn("Load a file from your Data Store in RStudio", page.inner_text(".mesa-yours__list"))
        self.shot(page, "14-route-tailored")
        record = json.loads(self.stored(page))
        self.assertEqual(record["profile"], {"portal": "yes", "language": "r"})
        self.assertEqual(record["schema"], 2)

        # The pathway page shows the same route; what was left out is named and still open.
        page.goto(self.base + "pathways/get-ready-for-a-session/")
        page.locator(".mesa-story").wait_for()
        self.assertIn("1 tutorial, 5 to 10 minutes", page.inner_text(".mesa-story"))
        self.assertEqual(page.locator(".mesa-stop.is-off").count(), 4)
        off = page.locator(".mesa-stop.is-off", has_text="Load a file from your Data Store into a notebook")
        self.assertIn("your route uses the R version", off.inner_text())
        self.assertIn("r-load-a-file", off.locator(".mesa-note a").get_attribute("href"))
        self.assertTrue(page.locator(".mesa-stop.is-off a.mesa-stop__title >> nth=0").is_enabled())
        self.assertIn("Load a file from your Data Store in RStudio", page.inner_text(".mesa-continue"))
        # The R version has a stop of its own on the path, under the point it belongs to.
        swapped = page.locator(".mesa-stage >> nth=1").locator(".mesa-stop:not(.is-off)", has_text="Load a file from your Data Store in RStudio")
        self.assertEqual(swapped.count(), 1)
        self.assertIn("is-next", swapped.get_attribute("class"))
        self.assertIn("0 of 1 done", page.locator(".mesa-stage >> nth=1").locator(".mesa-meter").inner_text())
        self.assertEqual(page.locator(".mesa-stage >> nth=1").locator(".mesa-here").count(), 1)
        self.shot(page, "15-pathway-tailored")

        # Its own page places it on the pathway being followed, and offers what comes next.
        swapped.locator("a.mesa-stop__title").click()
        self.arrive(page, "**/tutorials/r-load-a-file/", "Load a file from your Data Store in RStudio")
        page.locator(".mesa-strip").wait_for()
        self.assertIn("Get ready for a hands-on session · tutorial 1 of 1 on your route", page.inner_text(".mesa-where"))
        page.get_by_role("button", name="Mark as done").click()
        self.assertIn("That was the last one", page.inner_text(".mesa-strip__next"))
        box = page.locator(".mesa-strip form input[type='text']")
        box.fill("150")
        box.press("Enter")
        page.locator(".mesa-check__result code", has_text='na.strings = ""').wait_for()
        self.assertNotIn("`", page.inner_text(".mesa-strip"))
        page.get_by_role("button", name="Undo").click()

        # With an hour, the route fills with more, and never passes the hour.
        page.goto(self.base + "pathways/")
        page.locator(".mesa-start").wait_for()
        page.locator("input[name='mesa-start-language'][value='python']").check()
        page.locator("input[name='mesa-start-portal'][value='no']").check()
        page.locator("input[name='mesa-start-minutes'][value='60']").check()
        page.wait_for_function("document.querySelectorAll('.mesa-yours__list > li').length > 4")
        text = page.inner_text(".mesa-yours .mesa-story")
        upper = int(text.split(" minutes")[0].split(" ")[-1])
        self.assertLessEqual(upper, 60, text)

        # Clearing the answers keeps what was finished.
        page.evaluate(f"""() => {{ const r = JSON.parse(localStorage.getItem('{KEY}'));
            r.tutorials['sign-in'] = {{ done: '2026-11-14', rev: 'r' }}; localStorage.setItem('{KEY}', JSON.stringify(r)); }}""")
        page.reload()
        page.get_by_role("button", name="Clear my answers").click()
        page.locator(".mesa-yours .mesa-story", has_text="Choose what brings you here").wait_for()
        record = json.loads(self.stored(page))
        self.assertEqual([record["profile"], record["pathway"], list(record["tutorials"])], [{}, "", ["sign-in"]])
        # A self-check answered on its tutorial never shortens the route, even when
        # it is the whole skip-check for its point. Skipping is asked for on the pathway.
        page.goto(self.base + "pathways/")
        page.locator(".mesa-start").get_by_label("Use an AI agent and check what it says").check()
        page.locator("input[name='mesa-start-minutes'][value='60']").check()
        page.locator(".mesa-yours .mesa-story", has_text="7 tutorials").wait_for()
        page.goto(self.base + "tutorials/check-a-suggested-result/")
        check = page.locator(".mesa-strip .mesa-check")
        check.get_by_label("G03, 251.1 mm").check()
        check.get_by_role("button", name="Check answer").click()
        page.locator(".mesa-strip .mesa-check.is-right").wait_for()
        self.assertIn("Next on your pathway", page.inner_text(".mesa-strip__next"))
        self.assertNotIn("p4", json.loads(self.stored(page))["points"])
        page.goto(self.base + "pathways/use-an-ai-agent/")
        stage = page.locator(".mesa-stage", has_text="Explore and verify")
        fold = stage.locator(".mesa-skip__fold > summary")
        self.assertIn("skip the rest if you like", fold.inner_text())
        self.assertIn("1 of 7 done", page.inner_text(".mesa-head"))
        fold.click()
        stage.get_by_role("button", name="Skip the rest of this point").click()
        stage.locator(".mesa-skip__fold > summary", has_text="Skip-check passed").wait_for()
        self.assertIn("p4", json.loads(self.stored(page))["points"])
        self.assertIn("1 of 5 done", page.inner_text(".mesa-head"))
        self.assertIn("1 of 1 done. Point finished. Skip-check passed.", stage.inner_text())
        self.assertNotIn("p1", json.loads(self.stored(page))["points"])
        self.assertEqual(errors, [])
        context.close()

    def test_phone_shows_one_point_at_a_time(self):
        context = self.chromium.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()
        page.goto(self.base + "pathways/get-ready-for-a-session/")
        page.locator(".mesa-map").wait_for()
        self.assertEqual(page.locator(".mesa-stage:visible").count(), 1)
        self.assertEqual(page.locator(".mesa-map__stop").count(), 5)
        page.locator(".mesa-map__stop >> nth=2").click()
        self.assertIn("Query and connect", page.inner_text(".mesa-stage:visible"))
        self.assertIn("Nothing you need here", page.inner_text(".mesa-stage:visible .mesa-meter"))
        self.assertEqual(page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), True)
        self.shot(page, "06-phone-pathway", full=False)
        # A field under 16px makes Safari on a phone zoom in when it is tapped.
        size = "[...document.querySelectorAll('%s')].map(e => parseFloat(getComputedStyle(e).fontSize))"
        notes = page.evaluate(size % ".mesa-reflect__text")
        self.assertTrue(notes, "no notes box on the pathway page")
        self.assertGreaterEqual(min(notes), 16)
        page.goto(self.base + "tutorials/check-range-and-missing/")
        page.locator(".mesa-check__input").first.wait_for()
        self.assertGreaterEqual(min(page.evaluate(size % ".mesa-check__input")), 16)
        context.close()

    def test_everything_reads_with_javascript_off(self):
        context = self.chromium.new_context(java_script_enabled=False)
        page = context.new_page()
        page.goto(self.base)
        page.get_by_role("link", name="New to MESA? Start here").click()
        self.arrive(page, "**/pathways/new-to-mesa/", "New to MESA")
        article = page.locator("article")
        self.assertIn("The essentials: 3 tutorials, 15 to 25 minutes in all", article.inner_text())
        self.assertEqual(article.locator("ol > li > a").count(), 3)
        self.assertEqual(article.locator("ul > li > a[href*='tutorials']").count(), 3)
        self.assertEqual(page.locator("[class*='mesa-btn'], .mesa-strip, .mesa-map, article button").count(), 0)
        self.shot(page, "07-pathway-javascript-off")
        article.locator("ol > li > a").first.click()
        self.arrive(page, "**/tutorials/sign-in/", "Sign in to the MESA Portal")
        self.assertIn("Sign in to the MESA Portal", page.inner_text("h1"))
        self.assertEqual(page.locator(".mesa-strip, article button").count(), 0)
        for path, expect in [("pathways/", "Learning pathways"), ("pathway/", "Every tutorial, by pathway point"),
                             ("tutorials/", "Tutorials"), ("progress/", "Your progress")]:
            page.goto(self.base + path)
            self.assertIn(expect, page.inner_text("h1"))
            self.assertEqual(page.locator("article button, article input").count(), 0, path)
        self.assertIn("scripts are off", page.inner_text("article"))
        # Self-check questions and answers are readable, folded away but in the page.
        page.goto(self.base + "pathways/self-checks/")
        text = page.locator("article").inner_text()
        self.assertIn("Remove exact repeats with drop_duplicates(). How many rows remain?", text)
        self.assertEqual(page.locator("article details details").count(), 15)
        first = page.locator("article details >> nth=0")
        first.locator("summary >> nth=0").click()
        first.locator("details > summary").click()
        self.assertIn("Shared.", first.locator("details").inner_text())
        self.assertIn("151.", page.locator("article").inner_html())
        self.shot(page, "12-self-checks-javascript-off", full=False)
        context.close()


if __name__ == "__main__":
    unittest.main()
