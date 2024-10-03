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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QxemdEyzOgc7hBa96dc6c3db54a1c5230ceafe9de3&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'ZVd6TDNia21Gdmw0MlJiSmJzUVdzei95M29OaFJ6MlBGWTkrOTRoOWJzd0ZQOWl0b2JkelRZd0N2eGN1WkJvU3lJSkFTK1hEME5QZ2owL3QvdzV6MHhuL1ZoNklUSUpMTVFZUTViWlFhU2VRM3U0Q1RKWmxLMTZLdXAzUlR6bC94dHYvWEdiVlE1dGNYUmtVK0VMQnk1NXk2SUwvd0xwSHlXZjFRYjA0OW9MZ2FMT0xBbVdxV2hWTnV4TGtsYW9zSXNpNnpSR0lEUjFBQVBaQk9MNzQwYkZTVXhVS1hZRk82ZGx1bURhc0VNWm5LNlRZUjJXQkJ0TlE3U0ExNkFpV250ZkdML3ZtZTFvWWFrSEs4cTVSV1hqSlBxbW5NL1c4Y1R5cjBJZVltOXJ4SFZkV2xWMWdwWWQxbWxUWURESEhPU1A4R2VaZ3pPQmRSQTJuUUhHaThGSlE3WUJVRXNyMlM3c2lFMnFlbWd6RzZHMGtKWXdiUXBqNVZadlA3RlZyQ0ZvNDc2c25Ga3NTaG05RWpUa1NPUT09LS1ZUTlUM1BZZWMzV3lsV0VHaGI1MW9RPT0%3D--cca3b6619b080dc58730f003bbffcfc17a19b00c',
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
