import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));
        page.on('requestfailed', request => {
            console.error('NETWORK ERROR:', request.url(), request.failure().errorText);
        });

        console.log("Navigating to http://localhost:8080/about/");
        await page.goto('http://localhost:8080/about/', { waitUntil: 'networkidle2', timeout: 30000 });

        await page.screenshot({ path: 'd:\\crestlineAfzal\\coworkit-exact\\cloned-site\\debug_screenshot.png', fullPage: true });

        // Check if there is any text content
        const bodyText = await page.evaluate(() => document.body.innerText);
        console.log("Body text length:", bodyText.length);
        if (bodyText.length < 100) {
            console.log("BODY TEXT SAMPLE:", bodyText);
        }

        await browser.close();
        console.log("Done. Check debug_screenshot.png");
    } catch (e) {
        console.error("Puppeteer script failed:", e);
    }
})();
