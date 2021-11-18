
jest.setTimeout(10000);

describe('Device Gallery', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:4000');
	});

	it('Should display "Device Gallery" header', async () => {
		await page.waitForSelector('h1[id="page-header"]');
		const textContent = await page.evaluate(() => {
			const selector = document.querySelector('h1[id="page-header"]');
			if (selector) {
				return selector.textContent;
			}
			return '';
		});
		expect(textContent).toEqual('Device Gallery');
	});

	it('Should filter input be accessible', async () => {
		await expect(page).toFill('input[data-automation-id="filter-input"]', 'A70s');
	});

	it('Should display "Samsung Galaxy A70s" card', async () => {
		await page.waitForSelector('div[data-automation-id="card-title"]');
		const textContent = await page.evaluate(() => {
			const selector = document.querySelector('div[data-automation-id="card-title"]');
			if (selector) {
				return selector.textContent;
			}
			return '';
		});
		await expect(textContent).toEqual('Samsung Galaxy A70s');
	});

	it('Should add to cart', async () => {
		await expect(page).toClick('button[data-automation-id="add-to-cart"]');
	});
	it('Should open cart', async () => {
		await expect(page).toClick('a[data-automation-id="open-cart"]');
	});
	it('Should cart contain items', async () => {
		await page.waitForSelector('ul');
		const numberOfItems = await page.$$('ul > li[class="clearfix"]');
		expect(numberOfItems.length).toBeGreaterThanOrEqual(1);
	});
});
