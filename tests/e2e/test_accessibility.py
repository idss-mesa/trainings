"""Accessibility checks of the learning pathways, against the built site.

Runs the axe engine (WCAG 2.0, 2.1 and 2.2, levels A and AA) on the pathway,
tutorial, list, self-check and progress pages, with a learner record in place
and the folded parts opened, at desktop width and at 320 pixels. Then follows a
whole pathway with the keyboard alone, and checks reflow, zoom and motion.

    zensical build --clean --strict && python scripts/postbuild_agent_surface.py site
    pip install playwright && playwright install chromium
    npm install --no-save axe-core@4
    python tests/e2e/test_accessibility.py

MESA_AXE may name another copy of axe.min.js.
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
AXE = Path(os.environ.get("MESA_AXE", ROOT / "node_modules" / "axe-core" / "axe.min.js"))
KEY = "mesa-trainings"
TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]
PAGES = ["pathways/", "pathways/get-ready-for-a-session/", "pathway/", "tutorials/",
         "tutorials/count-records-per-day/", "tutorials/load-a-file/", "tutorials/sign-in/",
         "pathways/self-checks/", "progress/", "trace-cards/",
         "trace-cards/card-7-g03-total/", "trace-cards/how-to-use/",
         "explainers/reading-what-an-agent-did/", "bring-your-own-data/"]

# A record with every state in it: done, checked, updated since, a missed and
# a passed self-check, a level, a reflection, and a passed skip-check.
RECORD = {
    "schema": 2, "started": "2026-11-01", "pathway": "get-ready-for-a-session",
    "profile": {"language": "r", "minutes": 30},
    "tutorials": {
        "sign-in": {"done": "2026-11-01", "rev": "2026-01-01T00:00:00Z"},
        "find-your-way-around": {"done": "2026-11-01", "rev": "2026-11-12T00:00:00Z"},
        "load-a-file": {"done": "2026-11-02", "checked": "2026-11-02", "rev": "2026-11-12T00:00:00Z"},
        "reconcile-a-join": {"done": "2026-11-03", "checked": "2026-11-03", "rev": "2026-11-12T00:00:00Z"},
    },
    "checks": {
        "last-row": {"correct": True, "tries": 1, "sure": 3, "on": "2026-11-02"},
        "rows-without-repeats": {"correct": False, "tries": 2, "on": "2026-11-02"},
        "rows-in-centimetres": {"correct": True, "tries": 1, "on": "2026-11-03"},
        "readings-above-twenty": {"correct": True, "tries": 2, "on": "2026-11-03"},
    },
    "points": {"p2": {"level": "exploring", "reflection": "Check the units first.", "on": "2026-11-02"},
               "p3": {"skipped": "2026-11-03"}},
}


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Accessibility(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (SITE / "index.html").exists():
            raise unittest.SkipTest("build the site first: zensical build --clean --strict")
        if not AXE.exists():
            raise unittest.SkipTest(f"axe not found at {AXE}: npm install --no-save axe-core@4")
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

    def context(self, **options):
        context = self.chromium.new_context(**options)
        context.add_init_script(f"if (!localStorage.getItem('{KEY}')) localStorage.setItem('{KEY}', {json.dumps(json.dumps(RECORD))});")
        return context

    def settle(self, page, path):
        page.goto(self.base + path)
        page.wait_for_load_state("networkidle")
        if path != "pathways/self-checks/":
            page.wait_for_selector("article[data-mesa]")
        # Open everything that folds, so its contents are checked too.
        page.evaluate("document.querySelectorAll('article details').forEach(d => { d.open = true; })")

    def violations(self, page):
        page.add_script_tag(path=str(AXE))
        result = page.evaluate("tags => axe.run(document, { runOnly: { type: 'tag', values: tags } })", TAGS)
        return [f"{v['id']} ({v['impact']}): {v['help']} -> " + "; ".join(" ".join(n["target"]) for n in v["nodes"][:4])
                for v in result["violations"]]

    def test_no_violations_at_desktop_width(self):
        context = self.context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        for path in PAGES:
            with self.subTest(path):
                self.settle(page, path)
                self.assertEqual(self.violations(page), [])
        context.close()

    def test_no_violations_and_no_sideways_scroll_at_320_pixels(self):
        context = self.context(viewport={"width": 320, "height": 640})
        page = context.new_page()
        for path in PAGES:
            with self.subTest(path):
                self.settle(page, path)
                self.assertEqual(self.violations(page), [])
                overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                self.assertLessEqual(overflow, 0, f"{path} scrolls sideways by {overflow}px")
        context.close()

    def test_usable_at_200_percent_zoom(self):
        # 1280 pixels at 200 percent is the layout of a 640 pixel window.
        context = self.context(viewport={"width": 640, "height": 450}, device_scale_factor=2)
        page = context.new_page()
        for path in ["pathways/get-ready-for-a-session/", "tutorials/count-records-per-day/", "progress/"]:
            with self.subTest(path):
                self.settle(page, path)
                self.assertLessEqual(page.evaluate("document.documentElement.scrollWidth - window.innerWidth"), 0)
                clipped = page.evaluate("""() => [...document.querySelectorAll('article [class*=mesa-]')].filter(e => {
                    const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1); }).length""")
                self.assertEqual(clipped, 0)
        context.close()

    def test_controls_are_at_least_24_pixels_and_show_focus(self):
        context = self.context(viewport={"width": 320, "height": 640})
        page = context.new_page()
        for path in ["pathways/get-ready-for-a-session/", "tutorials/count-records-per-day/", "progress/"]:
            with self.subTest(path):
                self.settle(page, path)
                small = page.evaluate("""() => [...document.querySelectorAll(
                    'article button, article summary, article .mesa-btn, article input[type=text], article textarea, article label:has(input)')]
                    .filter(e => e.closest('[class*=mesa-]') && e.offsetParent)
                    .map(e => [e.className || e.tagName, Math.round(e.getBoundingClientRect().width), Math.round(e.getBoundingClientRect().height)])
                    .filter(([, w, h]) => w < 24 || h < 24)""")
                self.assertEqual(small, [])
                rings = page.evaluate("""() => [...document.querySelectorAll('article button, article .mesa-btn, article summary, article input, article textarea')]
                    .filter(e => e.closest('[class*=mesa-]') && e.offsetParent && !e.disabled && e.tabIndex >= 0)
                    .filter(e => { e.focus({ focusVisible: true }); const s = getComputedStyle(e);
                                   return document.activeElement === e && (s.outlineStyle === 'none' || parseFloat(s.outlineWidth) < 2); })
                    .map(e => e.className || e.tagName)""")
                self.assertEqual(rings, [])
        context.close()

    def test_nothing_moves_under_reduced_motion(self):
        context = self.context(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
        page = context.new_page()
        self.settle(page, "pathways/get-ready-for-a-session/")
        moving = page.evaluate("""() => [...document.querySelectorAll('[class*=mesa-]')].filter(e => {
            const s = getComputedStyle(e);
            return s.animationName !== 'none' || s.transitionDuration.split(',').some(d => parseFloat(d) > 0); }).length""")
        self.assertEqual(moving, 0)
        context.close()

    def test_a_whole_pathway_by_keyboard_alone(self):
        context = self.chromium.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        def tab_to(selector, limit=400):
            for _ in range(limit):
                page.keyboard.press("Tab")
                if page.evaluate("s => document.activeElement && document.activeElement.matches(s)", selector):
                    return
            self.fail(f"Tab never reached {selector}")

        page.goto(self.base + "pathways/new-to-mesa/")
        page.wait_for_selector(".mesa-continue .mesa-btn")
        tab_to(".mesa-continue .mesa-btn")
        page.keyboard.press("Enter")
        for step in range(3):
            page.wait_for_selector(".mesa-strip button[data-key=mark]")
            tab_to(".mesa-strip button[data-key=mark]")
            page.keyboard.press("Enter")
            page.wait_for_selector(".mesa-strip button[data-key=undo]")
            self.assertTrue(page.evaluate("document.activeElement.matches('[data-key=undo]')"))
            if step < 2:
                before = page.url
                tab_to(".mesa-strip__next a:first-child")
                page.keyboard.press("Enter")
                page.wait_for_function("u => location.href !== u", arg=before)
                page.wait_for_function("document.querySelector('article[data-mesa] .mesa-strip') !== null")
        self.assertIn("you have finished", page.inner_text(".mesa-strip__next"))
        self.assertEqual(len(json.loads(page.evaluate(f"localStorage.getItem('{KEY}')"))["tutorials"]), 3)
        context.close()


if __name__ == "__main__":
    unittest.main()
