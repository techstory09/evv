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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R4ROCHoBTHnIAE33d0376db47c3bee47804f9ee830&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'SUNjVFJOY3VrZUlWWWY4TzhkaFlhZnR5U1U5VXlXSUpmQWhpWXNwVGlORjM0Q1QyeHhvWldLR2l5cXdNZXE5VEJzWlZ5QjhmTGxkaHViNHI4cU94L0xzMlJnM1gxejRJYldvbkpHM0NONzdFOGJlTUN5ZUFNVG5nZ0JtUVdqcUZPZTZteEdkNnEyNDlqUmN4cjNiTTIyMTdjeVJGRnZOOWxFY2cvcHNaL1EyUUR3bnF6aTdOK1IzZHo1R2ppVk5zSWx1cFYwanVrOEorYlJkLzBVY25Ia2R6YmRpQ3Vpa0J4QWFFSmNoWTBCSy9waXdkMHBHQS9WQjNLN0RDck5DUWpoNVdyN0NHdTdSQi9JQVNuUEI5eVB1Wm56YnJMMis1UkF3U0djbkgvR1M0VWY0K1ZoSHNhUWpFa2ROcHRWME9Nd2hrZVVmUDNMR2xzanZSQklBdjA2M3V2MWdueTRFbjVoc2Z0dWd1UllxelpGd0VteXRYZmY5MUtlaDF5cVVSMExlWnRxMUI0Szd0dVRVVVh6aFdhQT09LS1LNFBHNndoMkJUVTVDY29rTDJJV2NBPT0%3D--e9242574d48ee644d06f31502d9bfbce97bea757',
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
