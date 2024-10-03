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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=Qxnn1mbCA43jAVc9049d94b27a31c36685dc50c0c7&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'MnVQNnhJaFloZGhzRkNia0hmWGFDVnVKZ3AzUnVrck96VlAxcENhSUpNU3IvejJtQVd4YWplWXBBNzlGT3RhdEJTRCtXMllNNVZYR3pocTRrVjRPSVFKZW5JTUw1TkVHaGFUclN2ZFlkbXhKTXBHcEI4WmgwbTlCMnA1Q1NxaDRBUSs3a3YwODFiNW5nSWNWZ01CYVRmeVZrdThKU3FtSlVUYlhTL0FpaWE4ZzhNcEV0TC91NEVQcng0eW85YVRKRGZ5SW40THFLT1dIY0JDZ1g0ZG0rWXhIbzFHRVRIVHlMamZ0Q3Z6cWhZWTMyc3QzRU5WQnJCZ3llakc2Q2tlTzlUUmNBUk1vMUpGZDRmTy9rU0p0RnZBVWNrcXIzK1hqaUNEMGFxblYwTlRTdk5ZMmFwZDJZemM0TFFUNFpOY0V6WGpMdVN3cTArME5wNVB4YUI4eEtUdlZPTUZhMW5WZVV2MG1weDFHaHVnQTdXMFo4TWM0a0xqWDFlTTZUVVgvM2FPdHJsSXcvVTBreWRoTVZIaU1Ddz09LS0zbDVtYi9Uem85SVJWUm9neE01QVhRPT0%3D--fd7189f679ad07c19caaa2d741b235134ac8c1cf',
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
