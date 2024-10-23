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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R5Hq6Cy6KkbcF81527a1842cd8e63a18ae87b8f892&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'VEdDc1lLeGYydDliWW16cVMyOWZCQldNcDJ1d25tUjg4cFhXQXh2cnV0U3hFSVgveEF1YjlPcUdEY2xQenJneWx4MHRpMlVaMU9VVE1RUmlrM2FEMDFlK2xKQWltOXkzMlJxMEkwbnFFd1g1cXVRUmZCNHlzRGd4SU1NamtISWxZbktEU09YM2orNTJaYURUenRERG9VNjNkL0NMclFJNXNtOS9NV3BLb0Yxa2owMEZ1WXN4WW5JMTNKRkVwMFJMcG5SaWoveWlRZS9UN1JJK1FoNm1yU3lyN0IyNGJOVVN1TVR6bTRINEFCSC94Mndsek5pTHhGUU1TdWlyN1VDSDYrZlZROWdrZ0doS0NoV2w1YmtrYWowYVhUTWdBU1ZVUDZRbk9CNENERDJseXV4YkYzK0x5N2t2SlM4aGVGVzdvYlh1Y0x3UDBuM2hLSmUyZHE5WXBEaENza3JheTF2Q2JpYjYyUko2T0J6b29kTiswTzlhSis3QXlja0VwV3QrZlBXa2x0b09CQ0F3UDlSdEFHWGhhUT09LS1aVjk1U0xxaFJNUWlXdTY2Y2RZeWNRPT0%3D--6128c133e713eb9408331698afe5baa005437db0',
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
