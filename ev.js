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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R4PPAgdUOae6wj3f512882a5284c3a55f461753d50&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'YXFTNHUvZEwwU0hMN1RUcm9mbDBSK2RwQ2xIWG56MWYyT3JWbGhUWUtWYnVwUExJUGw2SWJpYkQyOFp0RG0ybVNOT2tFcE1oWXpkYkhNS3BITW9tUXlMSFlYa1BtMTBwenRoemFTS09JUVRQbDFGdnpJMG83eU8zc0ZtcXZpMmVZMU13WTNTWHY1WEVmY1VzaHdGbmxRYlpRR3k1SjAxTDRSaFY0ZFFzbFlEdTlsYkcxNk40bnprSGx6TFRzZXdReHkyTmFrUW9TcWlOcDBJbzRYemRheVl4cVR3STVSVE50MW9IMmUwOU9BdS9jdUJPUWptUjB1Wkx5eHd0NG9JNzNSNHVvVy9GWnZ3U3dqVkhFYjFFNDlNRHdsNG9TWHBlK3dGbkZyQnY5a1RESHVQVk0wUkF3c0t3ZDk3LzJJc3FmYUVUQ3RkQ0RIVDBFamh5ZkFYTWVJK1JvNWU2akdYV3dvTTUxTTNwZ0xBdDBIVENvaXZXalgvcHNObndDeHR4SFFqbHoyQjJXUkVVRUZpU3UyL2xodz09LS1FZGhWTzMzUnJ1RzhNZlhhSDdNSENnPT0%3D--e660c0a9a92c8a6537ead979886aa8134ee50b1f',
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
