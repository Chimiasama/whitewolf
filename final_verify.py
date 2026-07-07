import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3000")

        # Select Vampire
        await page.click("text=Vampire: The Masquerade")

        # Click Ancilla to get a character
        await page.click("text=Ancilla")

        # Wait for the sheet
        await page.wait_for_selector("text=Attributes")

        # Scroll to disciplines
        await page.click("text=Auspex")
        await page.wait_for_timeout(1000)

        # Take screenshot of the modal
        await page.screenshot(path="/home/jules/verification/screenshots/final_auspex_modal.png")

        # Check for the fixed power name
        # The key was disciplines.auspex.powers.implantDream
        # In English it should be "Implant Dream"
        has_implant_dream = await page.query_selector("text='Implant Dream'")
        print(f"Has 'Implant Dream': {has_implant_dream is not None}")

        # Check for Requirements text
        has_requirements = await page.query_selector("text='Requirements:'")
        print(f"Has 'Requirements:': {has_requirements is not None}")

        await browser.close()

asyncio.run(run())
