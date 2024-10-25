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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R5qkxN4ddGJJlR3d6d3eb7589cc288e195d6b9719c&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'N0RMdFNkVlVFdEI5TEFtYnVGMWxUZGRMSmN4SktYK3lNTHRJemY4UG5MQUxDdFkvWm9wN01YSXdNZzB6UFdkSUpsODRxbFVQaFBQSk9ONmhlbkVGUXNyOSt0UHdVdUtUbXgvam0xcElNdGU3UTRCZjNYYnY2Yk9lN2ZMd0w4QkNQT2d5Zk9VWmdHc3FpcEl2WDYrRVRaRXRTZWU0T2t2RlM1VDV2ejM5OUh6UWoxYlBhc0ttOXdJQVpQdDR6OFRhdGRNUTBnN1RKbjQxYnJNbXNhT0JQbzg0SzlKQjBYZUVRalBpNEdSckJRUk5WcjZza0k1a1VOUmFlaC8zVXFVMUVCVXM4ZEpGSnVQd0pEa1kxMHl0MGF1RVNPajh6YnpZZEl6TlhQOFZ5eTBLcklnL3REUTdxU0M1dDA2L0hSUERZLzZ2cG45WWZ2ODR0L1NqUlkralp1UDF1cnByOVczb2V3cnBKRXBwaUg3TnhTV3ZJdTh4cDJMV0tUN0JqTkI0a0RWNTYvQmh2QkFOZ0NidER5TnJwdz09LS1GNU5Jam02b1JzeW9JbVV1VGNlM0JRPT0%3D--99e06835836f1d2c87f51c3659bfbe3f89f5df1f',
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
