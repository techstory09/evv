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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QsSRSpVrkfGi1V1f8467f6d881182dcdc00bdb68bc&--proxy-server=http://45.67.3.29:6192`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'b2xla0wvT1k5ZmV5OWdMR2lKSHhCZ1dUL2VaWU02S2dSeGkwczdkOHZ5OEpCK0gxR1pjKzl1bHhXLzNBRmNzRjQ0T3hIakdrZUdVVmx2VVZuV2RpS0VjL0hDWjV2YUUvcHJScHhJaFc2MXBJaGEvYkcxRW5yRFZxNlFERGQza3pVV3YrZHJQVktPZkc5Y2FKSzdPNkFkNW8yMHBhZ3ZReVpJVDllc0swRHh1Rkc5eklDaytBWk9kM2N2dFFlanhOaHRJc1pYKzJ2Qm1rRU9CWVhJcnJxbGUwanR5QUFTWUZSRE1ndVo3L29taHIrdU9EaTZWNVcyNTJ4aGx0YVhjQVh3dmhDYWFZMkVoSDFrQmZ6c2FreFNVSjI2ejZweUUxZzJLTmZmQVhZRzVxTnVKZlRVQTNHNE1KczY2UjU1Sldxd3JWcUxWemc5K0RVa1Y1bzB0YTBkdlcybGpJR3ZvSXRVVkExV3kwelN5NDNsQ1J0SjBya1dtdFdjVVRrU1U5NnJoV2ljOWszZjdGTUU0MjVkZDlCQT09LS13SzZySjYra1BQbjJUYXBIRXFsU0x3PT0%3D--5c3cf90860f51565ec155cd4236cddbf8a2dd09b',
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
