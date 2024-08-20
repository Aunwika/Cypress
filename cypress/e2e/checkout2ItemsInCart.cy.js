const { test, expect } = require('@playwright/test');

test('E-commerce Order Test with Playwright', async ({ page }) => {

    // Step 1: Login to the application
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.fill('input[formcontrolname="userEmail"]', 'testemail@test.com');
    await page.fill('input[formcontrolname="userPassword"]', 'Test@123');
    await page.click('#login');

    // Step 2: Add two products to the cart
    const productButtons = await page.$$('.card-body button');
    await productButtons[0].click(); // Add first product
    await productButtons[1].click(); // Add second product

    // Go to the cart
    await page.click('[routerlink="/dashboard/cart"]');

    // Step 3: Proceed to checkout
    await page.click('text=Checkout');
    await page.fill('[placeholder="Select Country"]', 'India');
    await page.click('.ta-results button:has-text("India")');
    await page.click('.action__submit');

    // Capture order ID
    const orderId = await page.locator('.order-summary .ng-star-inserted').textContent();

    // Step 4: Verify the order ID in the order history
    await page.click('button:has-text("Orders")');
    await expect(page.locator('tbody')).toContainText(orderId);

    // Optional: Take screenshots at key steps
    await page.screenshot({ path: 'screenshots/after-checkout.png' });

    console.log(`Order ID ${orderId} has been successfully placed and verified.`);
});

