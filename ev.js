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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R3mZh9sIFCii8kdd4f4960d11e691e10c21855648d&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'WkVTdXhzSFFKd1hDcW40cU9zUUd1VkorTnY1SStCbHhBallQNG1EbDNreUw0Rk9aSWFRRG5hY0JadzJCSm5jRWJHNStQWktKcENhY3VaVThhL0VuMlRDaVZsbkVNUDAreTZTNllaUUJhdjNRU0gxQjJuNndNY1drTnlRUjZ4MWJhYU5HWWZvb280L0VidGhhMnVyeEljT2x5dW9LLzJBazhKQ1c0Sjk0Vng4S1JzUEc2ZTdGMEpSbGZXb0hURjhmVXplOUU1c0l6TlRPdHd0dWpsN25KVWhoa3JMYlIrc3pmbXUybjVhQVBIQnZBdFdnY2YwM3hrbjFUc2ZxaURaanRpSVdqQzZvWDJiRTNBazVTWlJ0djRMMGZjdWRFTE5VMWZnMFpoZUozQUVOaWlLNkdjWUk0K1h6VzR6YWRPb2FQQVMrUmhqdi9kUnlRUFcvLzhzMjJUN1B5UU5GU0FwOE4wWnBDaDBxVUJoei9IaUdjUmNscWtIOHhmZC9DRDRWVmZ6a2NoY2pheHFlSm14TTgyQ0N4dz09LS13TVJDUmE2QWhMK1BnM3ZHcmt0T0xRPT0%3D--35a5dd5c39a67387c831c64c5bc2b6558550e361',
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
