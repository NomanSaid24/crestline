import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const urls = {
    'about': 'https://coworkit.co/about',
    'features': 'https://coworkit.co/features',
    'pricing': 'https://coworkit.co/pricing',
    'addons': 'https://coworkit.co/addons',
    'contact-us': 'https://coworkit.co/contact-us'
};

const outputDir = path.join('d:\\crestlineAfzal', 'coworkit-exact', 'cloned-site');

async function scrape() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (const [name, url] of Object.entries(urls)) {
        console.log(`Scraping ${url}...`);
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
            // Wait for next hydration to begin or just grab the raw HTML server response
            // Actually, we want the RAW initial HTML including the __next_f strings

            // To get raw HTML without puppeteer executing JS and modifying DOM:
            const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
            const text = await response.text();

            const filePath = path.join(outputDir, name, 'index.html');
            // Ensure directory exists
            fs.mkdirSync(path.join(outputDir, name), { recursive: true });

            fs.writeFileSync(filePath, text, 'utf-8');
            console.log(`Saved ${filePath}`);
        } catch (e) {
            console.error(`Failed to scrape ${url}:`, e);
        }
    }

    await browser.close();
}

scrape();
