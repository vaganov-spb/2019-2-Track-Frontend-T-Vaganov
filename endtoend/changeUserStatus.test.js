import expectPuppeteer from 'expect-puppeteer';

describe('Send Message',() => {
	beforeAll(async () => {
		jest.setTimeout(10000);
		await page.goto('http://localhost:3000');
	});

	it('should load without error', async () => {
		await page.waitForSelector('[href="/profile/"]', { timeout: 1000 });
		await expectPuppeteer(page).toClick('[href="/profile/"]');
		await page.waitForSelector('[placeholder="Enter your name!"]', { timeout: 1000 });
		await expect(page).toFill('[placeholder="Enter your name!"]', 'test_name');
		await page.waitForSelector('[class^="ProfileHeader_mark_img"]', { timeout: 1000 });
		await expectPuppeteer(page).toClick('[class^="ProfileHeader_mark_img"]');
	});
});