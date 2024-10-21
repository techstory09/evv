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
            value: 'OVk4RlhpbGg1YVVkTFFJMEcvNGJlZmFkWkRjcjhRTmtYSHY0TWlLU1NCb1hEb2NJckdsUXpSRHlnYXQ0cjN1T3IzY3Q5ZmpJNnFPdmowZktVditpcnZxWFFZNVNHbW54WUtEUnpsVE1xZTdad2M4LzJWV0hFRWRYUDJ0Z3lCNVlSQ0RodkNndmJQa25KdzFSQVdLZStoSGZjWk1ZaHBLQi9XL1RwQ2tQb1dSY0VEaUUwdU5wWE0xTU52dlJ4K2tUZnYwT1I5b0gwbUlLZ1J1V0h3cnIwRE9rcnlpL2xlcTNrY2dhdWhTWVFEbmJjMnRQRjRxZlN6cXMrUDAvRjBiSVZvTGZhUnlxTXdoaU5kVWV0bXA4MktYMDU1U3ZydVIrUFpUS3BsRTVUaUl2Ry9CQmNBSnFINC9YT2pLam1OelJ2amU1TnNaZ1NDUFNYdmhvMnpoWFQ2MVAzdyt1RC9RdVhZdXU2MTRzZU9uRlU2b1JBK0plOFBPcUh4OFBocTNRbGlzWWZNVEJlc01uVm44N2ZVTjV5QT09LS00UkJlSnFkcmJTZjM3WEpvQlI1cDBRPT0%3D--067b2045a036f0e43c2b91007c817c07d6d6251e',
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
