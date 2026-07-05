import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 900},
            locale="en-US"
        )
        page = await context.new_page()

        print("Navigating to http://localhost:3000...")
        await page.goto("http://localhost:3000")

        # 1. Select Vampire
        print("Selecting Vampire...")
        await page.click("text=Vampire: The Masquerade")

        # 2. Select Manual Creation
        print("Selecting Manual Creation...")
        await page.wait_for_selector("button:has-text('MANUAL CREATION')", state="visible")
        await page.click("button:has-text('MANUAL CREATION')")

        # 3. Concept
        print("Filling Concept...")
        await page.wait_for_selector("h2:has-text('Concept')", state="visible")
        inputs = await page.query_selector_all("input:not([type='file'])")
        if len(inputs) >= 5:
            await inputs[0].fill("Test Vampire")
            await inputs[1].fill("Test Sire")
            await inputs[2].fill("Test Concept")
            await inputs[3].fill("Test Ambition")
            await inputs[4].fill("Test Desire")
        await page.click("button:has-text('Next')")

        # 4. Clan
        print("Selecting Clan...")
        await page.wait_for_selector("text=Ventrue", state="visible")
        await page.click("text=Ventrue")
        await page.click("button:has-text('Next')")

        # 5. Attributes
        print("Filling Attributes...")
        await page.wait_for_selector("h2:has-text('Attributes')", state="visible")
        attr_map = ["Strength", "Dexterity", "Stamina", "Charisma", "Manipulation", "Composure", "Intelligence", "Wits", "Resolve"]
        vals = ["4", "3", "3", "3", "2", "2", "2", "2", "1"]
        for attr, val in zip(attr_map, vals):
            await page.click(f"button:has-text('{attr}')")
            await page.wait_for_selector("div[role='dialog']", state="visible")
            await page.click(f"div[role='dialog'] button >> text=/^{val}$/")
            await page.wait_for_timeout(100)
        await page.click("button:has-text('Next')")

        # 6. Skills
        print("Filling Skills...")
        await page.wait_for_selector("h2:has-text('Skills')", state="visible")
        skills = ["Athletics", "Brawl", "Stealth", "Etiquette", "Insight", "Intimidation", "Persuasion", "Streetwise", "Academics", "Awareness", "Finance", "Investigation", "Medicine", "Occult", "Politics"]
        s_vals = ["3", "3", "3", "2", "2", "2", "2", "2", "1", "1", "1", "1", "1", "1", "1"]
        for skill, val in zip(skills, s_vals):
            await page.click(f"button:has-text('{skill}')")
            await page.wait_for_selector("div[role='dialog']", state="visible")
            await page.click(f"div[role='dialog'] button >> text=/^{val}$/")
            await page.wait_for_timeout(100)
        await page.click("button:has-text('Next')")

        # 7. Finishing Touches - VERIFY MODALS
        print("Testing Multi-modal behavior...")
        await page.wait_for_selector("h2:has-text('Finishing Touches')", state="visible")

        # Add 3 dots to Presence
        presence_row = await page.wait_for_selector("div:has-text('Presence')")
        circles = await presence_row.query_selector_all("button.w-4.h-4")
        if len(circles) >= 3:
            await circles[2].click()
            print("Set Presence to 3 dots.")

        # Open Power Selection Modal (Modal 1)
        await page.click("button:has-text('MANAGE POWERS')")
        modal1 = await page.wait_for_selector("div[role='dialog']", state="visible")
        print("Opened Modal 1 (Power Selection).")

        # Trigger an info modal (Modal 2) inside Modal 1
        # Use aria-label="More info" from InfoIcon.tsx
        info_button = await modal1.wait_for_selector("button[aria-label='More info']", state="visible")
        if info_button:
            await info_button.click()
            await page.wait_for_timeout(500)
            print("Opened Modal 2 (Nested Info).")

            modals = await page.query_selector_all("div[role='dialog']")
            print(f"Active Modals: {len(modals)}")

            results = []
            for i, modal in enumerate(modals):
                # The z-index is on the parent container (fixed inset-0)
                parent = await modal.evaluate_handle("el => el.parentElement")
                z_index = await parent.evaluate("el => window.get_computed_style(el).zIndex")

                # The overflow is on the main tag inside the modal
                main_tag = await modal.query_selector("main")
                overflow = await main_tag.evaluate("el => window.get_computed_style(el).overflowY") if main_tag else "unknown"

                results.append({"z": int(z_index), "overflow": overflow})
                print(f"Modal {i}: Z-Index={z_index}, Overflow-Y={overflow}")

            # Verify the fix
            if len(modals) >= 2:
                success = True
                if results[-1]["z"] <= results[-2]["z"]:
                    print(f"FAIL: Z-index ordering incorrect ({results[-1]['z']} <= {results[-2]['z']})")
                    success = False
                if results[-2]["overflow"] != "hidden":
                    print(f"FAIL: Background modal not scroll-locked (found {results[-2]['overflow']})")
                    success = False

                if success:
                    print("Verification SUCCESS!")
                await page.screenshot(path="/home/jules/verification/screenshots/final_modal_verification.png")
            else:
                print(f"FAIL: Expected at least 2 modals, found {len(modals)}")
        else:
            print("Failed to find nested modal trigger")

        await browser.close()

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    asyncio.run(run())
