const express = require('express');
const app = express();
const port = 8000;
const puppeteer = require('puppeteer-core');

const proxy = 'http://45.67.3.29:6192';
const proxyUsername = 'msnmmayl';
const proxyPassword = '626he4yucyln';

app.get('/', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Missing url query parameter');
    }


    (async () => {
        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QsMdhzbPUkXsHg924360b9f81742adbb36e0aa14ea&--proxy-server=http://45.67.3.29:6192`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'NnZQeTB0b284UmhlNUYrWUtRVjFONDlJMzFRc1d1UTVpUTlEd01HdEdvVHlncm9nWDVHdnFoUktUaTFURkxkMTd6aytBbDRsUklkeFJlZkJrYjhCTXVSaExKYXc5MXZUWEljbUVZQ0xVQ2JFSE51QVNZVWhDNU1pN2grSjMzVEs5MWQ5aWF6SGFubHpsc2VGNERQVjJwblNRK0RmOTRISEJVR0lrV2dHUHpqOFNsS1c4ZmJ4L3F2VVF2NHlLS2VacytKL2ZieVhOMkZUdS9WcXBPOWFtcVdvTW1ZMkw4cEJyME8yb1RoV0l4Z3FJMmtjMVVWNi9HYng0SWhhNm9TWjJBdkZJVDUzdHBJakxZSC90amN5a09Pa3JFcnJ6K1kvV2xJeGZQZENXYUw5eXRJdjZQMmI5VHQ1ZWpNM3ZFRERiZHdCOTA2b1dRcElmVmZ0eFZzQVRWUERBeHJNdmJZRGNKU2h6Mm5iSmh3NjAwRnh3ZVRwWElDZ1RvRzhCVVZFZ2UwTzNBdG5xTThtakF2RFEvSUxhZz09LS1uNUJ1OXpOQXpHQ2dzeHYyVnl4aTl3PT0%3D--ed37e0d202ad700253802e84a7b9bed615144662',
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
