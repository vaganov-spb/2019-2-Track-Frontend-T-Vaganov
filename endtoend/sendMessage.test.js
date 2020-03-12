describe('Send Message',() => {
	beforeAll(async () => {
		await page.goto('http://localhost:3000/');
	});

	it('should load without error', async () => {
		await page.waitForSelector('[href="/chat/?chatId=3"]', { timeout: 1000 });
		await expect(page).toClick('[href="/chat/?chatId=3"]');
		await page.waitForSelector('[class^="FormInput_form"]', { timeout: 1000 });
		await expect(page).toFill('[class^="FormInput_form"]', 'test_message');
		await page.focus('[class^="FormInput_form"]');
		await page.keyboard.press('Enter');
	});
}); 
