const express = require('express');
const app = express();
const port = 8000;
const puppeteer = require('puppeteer-core');

const proxy = 'http://45.249.104.143:6438';
const proxyUsername = 'msnmmayl';
const proxyPassword = '626he4yucyln';

app.get('/', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Missing url query parameter');
    }


    (async () => {
        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QzHQbHATDxMZws482f4a0f42f93a3380218360e8bb&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'SVFmSGo0cExwbWdUZjBGZUUvcE1WZ2ZSWDVWR2hoUGw4Y0pUM29ZZzlBVDMzdHcxcUo3VjFnOC85VXFwcmExbE1CTGhkOVVUbFg2K0F4M3hGWjdNY1RERFlGZmQ5SE84YUJXWTFTZmZybnV1SmF5Q2JCREd3WlpNZVZrNVZjZXNIcHVYUjVjYUhYR0p6Ym5MUWNKNHRpSFVQVzg3b1cvQ2hVZU1PQTN2ckxhZ2dRV1dFR09FZS9GVGh3WStpN3R6Q205OWhqQjVpYm5sVWp5MUFFSGVETGVHNVJGc0ZZdnl0VG9BcXhydXpCTVBnRDdlRVl6THRqa1BuRkhQQXhpWUJGYXU1VVMxUWp0cDA2S0Q2cS9uVkdENmp3VnpQWjJmbDRUK3puU2toekNUSysyMUdWY0pwMERLT08yRWlkVmVsNjFwSkp2R3VTUFpJZFU4Q21DTGFLZjh4Rkh1RmJEVUMvY2p2QzVtRFpFTm82ODJqczlKUkUzVlF4a2hhQlR2anRqRmdTcVExK3ZsQ2FUVHMrbmRkZz09LS1xcEpZendmSVdlVG5VZEhjY1NMZi9BPT0%3D--8fa3f47ecffdc8ee744ef0c78095a3049cdb2661',
            domain: '.elements.envato.com', // Adjust the domain to match the target site
        });

        await page.goto(targetUrl, { waitUntil: 'networkidle2' });
            console.log('link Text:', targetUrl);
        // await page.waitForFunction(() =>
        //     Array.from(document.querySelectorAll('button, a'))
        //         .some(el => el.textContent.trim() === 'Accept all')
        // );

        // // Click the button with text 'Accept all'
        // await page.evaluate(() => {
        //     const button = Array.from(document.querySelectorAll('button, a'))
        //         .find(el => el.textContent.trim() === 'Accept all');
        //     if (button) {
        //         button.click();
        //     }
        // });
         console.log('link Text1:', targetUrl);
        // Wait for the button with text 'Let's create!' to be available
        // await page.waitForFunction(() =>
        //     Array.from(document.querySelectorAll('button'))
        //         .some(el => el.textContent.trim() === "Let's create!")
        // );

        // // Click the button with text 'Let's create!'
        // await page.evaluate(() => {
        //     const button = Array.from(document.querySelectorAll('button'))
        //         .find(el => el.textContent.trim() === "Let's create!");
        //     if (button) {
        //         button.click();
        //     }
        // });
 console.log('link Text2:', targetUrl);
        // Wait for the element containing the text to load
        await page.waitForSelector('.woNBXVXX');

        // Extract the text content
        const text = await page.evaluate(() => {
            return document.querySelector('.woNBXVXX').innerText;
        });

        console.log('Extracted Text:', text);
        await page.keyboard.press('Escape');

        // Wait for the button to be available in the DOM
        await page.waitForSelector('.ncWzoxCr.WjwUaJcT.NWg5MVVe.METNYJBx');

        // Click the button
        await page.click('.ncWzoxCr.WjwUaJcT.NWg5MVVe.METNYJBx');

        // Wait for the button to be available in the DOM
        await page.waitForSelector('[data-testid="download-without-license-button"]');
        console.log('Button clicked2!');
        // Click the button
        await page.click('[data-testid="download-without-license-button"]');

        // Set up request interception
        await page.setRequestInterception(true);

        page.on('request', request => {
            const url = request.url();
            if (url.includes('envatousercontent.com')) {
                // Log the URL
                console.log('Intercepted request URL:', url);
                res.send(url);

                // Abort the request
                request.abort();
            } else {
                // Allow the request to continue
                request.continue();
            }
        });
        // await browser.close();
    })();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
