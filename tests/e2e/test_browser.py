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
        self.assertIn("30 to 40 minutes in all", page.inner_text("article"))
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
        self.arrive(page, "**/tutorials/find-your-way-around/", "Find your way around")
        page.get_by_role("button", name="Mark as done").click()
        page.get_by_role("button", name="Undo").wait_for()
        self.assertTrue(page.locator("a.md-nav__link .mesa-nav-tick").count() >= 2)

        # Progress survives a reload and shows on the pathway, with what was accomplished.
        page.goto(self.base + "pathways/new-to-mesa/")
        page.locator(".mesa-story").wait_for()
        self.assertIn("2 of 6 done", page.inner_text(".mesa-story"))
        self.assertEqual(page.locator(".mesa-stop.is-done").count(), 2)
        self.assertEqual(page.locator(".mesa-stop.is-next").count(), 1)
        self.assertEqual(page.locator(".mesa-stop.is-done .mesa-did").count(), 2)
        page.locator(".mesa-did > summary").first.click()
        self.shot(page, "03-pathway-in-progress")
        page.reload()
        page.locator(".mesa-story").wait_for()
        self.assertIn("2 of 6 done", page.inner_text(".mesa-story"))

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
        self.assertEqual(page.locator(".mesa-stop").count(), 44)
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
        self.assertIn("0 of 6 done", page.inner_text(".mesa-routes"))
        with page.expect_file_chooser() as chooser:
            page.get_by_role("button", name="Bring back a saved copy").click()
        chooser.value.set_files(str(saved))
        page.wait_for_function(f"localStorage.getItem('{KEY}') !== null")
        self.assertEqual(self.stored(page), before)
        self.assertIn("2 of 6 done", page.inner_text(".mesa-routes"))

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

    def test_phone_shows_one_point_at_a_time(self):
        context = self.chromium.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()
        page.goto(self.base + "pathways/get-ready-for-a-session/")
        page.locator(".mesa-map").wait_for()
        self.assertEqual(page.locator(".mesa-stage:visible").count(), 1)
        self.assertEqual(page.locator(".mesa-map__stop").count(), 5)
        page.locator(".mesa-map__stop >> nth=2").click()
        self.assertIn("Query and connect", page.inner_text(".mesa-stage:visible"))
        self.assertEqual(page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), True)
        self.shot(page, "06-phone-pathway", full=False)
        context.close()

    def test_everything_reads_with_javascript_off(self):
        context = self.chromium.new_context(java_script_enabled=False)
        page = context.new_page()
        page.goto(self.base)
        page.get_by_role("link", name="New to MESA? Start here").click()
        self.arrive(page, "**/pathways/new-to-mesa/", "New to MESA")
        article = page.locator("article")
        self.assertIn("6 tutorials, 30 to 40 minutes in all", article.inner_text())
        self.assertEqual(article.locator("ol > li > a").count(), 6)
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
        context.close()


if __name__ == "__main__":
    unittest.main()
