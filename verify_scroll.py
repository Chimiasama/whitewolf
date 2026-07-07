import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3000")

        # Select Vampire
        await page.click("text=Vampire: The Masquerade")

        # Fill concept and click Next
        await page.fill("input[placeholder='Name']", "Test")
        await page.fill("textarea[placeholder='e.g., Disillusioned activist']", "Test")
        await page.fill("input[placeholder='Long-term goal, e.g., To overthrow the Prince']", "Test")
        await page.fill("input[placeholder='Short-term goal, e.g., To taste the blood of a celebrity']", "Test")

        # Scroll to bottom
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Check scroll position
        y_before = await page.evaluate("window.scrollY")
        print(f"Scroll Y before Next: {y_before}")

        # Click Next
        await page.click("text=Next")

        # Wait a bit for the effect
        await page.wait_for_timeout(500)

        # Check scroll position
        y_after = await page.evaluate("window.scrollY")
        print(f"Scroll Y after Next: {y_after}")

        await browser.close()

asyncio.run(run())
