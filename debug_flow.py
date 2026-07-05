import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 720})
        page = await context.new_page()

        print("Navigating to http://localhost:3000...")
        await page.goto("http://localhost:3000")

        # 1. Select Vampire
        print("Selecting Vampire...")
        await page.click("text=Vampire: The Masquerade")
        await page.click("button:has-text('Next')")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/debug_step_1_vampire.png")

        # 2. Select Manual Creation
        print("Selecting Manual Creation...")
        await page.click("text=MANUAL CREATION")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/debug_step_2_manual.png")

        # 3. Concept
        print("Filling Concept...")
        inputs = await page.query_selector_all("input")
        print(f"Found {len(inputs)} inputs")
        if len(inputs) >= 2:
            await inputs[0].fill("Test Vampire")
            await inputs[1].fill("Test Concept")

        await page.click("button:has-text('Next')")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/debug_step_3_concept.png")

        # 4. Clan
        print("Selecting Clan...")
        await page.click("text=Ventrue")
        await page.click("button:has-text('Next')")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/debug_step_4_clan.png")

        # 5. Attributes (This is the hard part - need 22 dots)
        # Based on memory: "Character attribute validation requires an exact total sum of 22 dots"
        # I might need to click a lot of dots.
        # Or I can try to find if there's a way to bypass.

        print("Current page content saved to page_content_debug.html")
        content = await page.content()
        with open("/home/jules/verification/page_content_debug.html", "w") as f:
            f.write(content)

        await browser.close()

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    asyncio.run(run())
