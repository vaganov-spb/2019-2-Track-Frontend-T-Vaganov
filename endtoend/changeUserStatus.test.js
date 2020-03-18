describe('Change Status',() => {
	beforeAll(async () => {
		await page.goto('http://localhost:3000');
	});

	it('should load without error', async () => {
		await page.waitForSelector('[href="/profile/"]', { timeout: 1000 });
		await expect(page).toClick('[href="/profile/"]');
		// await page.waitFor(2000);
		await page.waitForSelector('[placeholder="Enter your name!"]', { timeout: 1000 });
		await expect(page).toFill('[placeholder="Enter your name!"]', 'test_name');
		// await page.waitFor(2000);
		await page.waitForSelector('[src*="check-icon-png"]', { timeout: 1000 });
		// await page.waitFor(2000);
		await page.evaluate(()=> {
			document.querySelector('#saveToLsIcon').click();
		});
	});
});