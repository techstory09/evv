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
            value: 'eWV0aWczam51VndGalBoeGsvUGJ4Uk5aT0c5WlJiRS91b3hYdGZPMHhlOXc1UjZtZW96dlV5V3c2akxRSmkwc3VtOFR5RFZVYWVCVVROYXF6YndJb0pHcVJmM0wyZnlRayt1ckp1aEdDdHgxQi9zWkYxQXRXNnlJSHA0akc4VU95bUhoUGN0em1uY092QnNteFR1TFY2VXZINS9kc2R4Z1QxT2tmWUNxSkpPRkhXOThsQ0JXdzVHcVAvK2pESStkZlpQWVUzUUx3cjZLZHFiQUQxdUtiK0JEM2pMVFFkQ3FZM1FnOHIzTmMyYVFOTWlUTnNleXMveU04QWZpNFZOY3c1ZC8reCtzMjUyTExOQ2lONG5wQUlhR3A2NlVkWlIrRGZONlZSOXV2S3Jyd1RQQjZOWFBWZUlDYk5EdWltdUNlUnBCVm1Sd01FZEtJUmtNbWpZMEo2aTNFZmZERTlGRVdiMkJpMHhSTFV5QTV0N3c0RjdvU0hIQXBMamZZWXhZeENYYkxVSGRtdzdDQlYwM0ZpTDR1Zz09LS1qemNTRE96d1Flck1PSWtXNjliRG9nPT0%3D--f63ef23303206ec1ad690440bed1cf5598be9775',
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
