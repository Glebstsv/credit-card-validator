describe('Credit Card Validator E2E Tests', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000');
    });
    
    test('page should load with correct title', async () => {
        const title = await page.title();
        expect(title).toBe('Credit Card Validator');
        
        const h1Text = await page.$eval('h1', el => el.textContent);
        expect(h1Text).toBe('Credit Card Validator');
    });
    
    test('should display payment system logos', async () => {
        await page.waitForSelector('.payment-system');
        const logos = await page.$$('.payment-system');
        expect(logos.length).toBeGreaterThan(0);
    });
    
    test('should validate valid Visa card', async () => {
        const input = await page.$('#cardNumber');
        await input.type('4111111111111111');
        
        await page.waitForTimeout(500);
        
        const resultClass = await page.$eval('#validationResult', el => el.className);
        expect(resultClass).toContain('valid');
        
        const resultText = await page.$eval('#resultText', el => el.textContent);
        expect(resultText).toContain('Visa');
    });
    
    test('should show error for invalid card', async () => {
        // Clear input first
        const input = await page.$('#cardNumber');
        await input.click({ clickCount: 3 });
        await input.press('Backspace');
        
        // Enter invalid card
        await input.type('4111111111111112');
        
        await page.waitForTimeout(500);
        
        const resultClass = await page.$eval('#validationResult', el => el.className);
        expect(resultClass).toContain('invalid');
    });
});