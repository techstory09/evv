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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QrQ9RF7xsu5G9fe33a3a5a94883c53477f37a0ad6c&--proxy-server=http://45.67.3.29:6192`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'clNCNFpWekxwWk5KRGloWCs4eGdwMnlBd3dPbVdUbDZ2SnFmL29sSDB5SW9KSEtibVB5cTZxTWVMNENvZUlrc290cnRtRGdqcVNsaVdnWS9lVG5KMlpmUDZTclc4Z0x6Z25wVjJteHJWTTk0SzJpcGhDdERHQktmZGR4UUhReGdubkRKbCtCU3hIbUJFQlNDNjdEbDVqaDJUVWFaMU9pNC9hendxV21EWktORzRLSmo3VnpBQWZBQ212Y3RLU2NheEJPclMwUGJZVGZaNHludjFROCtuVlBNanNCci9LODZTbjdHSnUrS3hPdWYrOGI0S1NpRVE2d0ZWbUgxTnh3UFNKQTA3MER5Yjl6ekdad1dSei9wQ0luZkJjYUNDNXlFZU9sQnFDcCtjM3NUcFR3Z1FaaWlOWjhzZTdDYnloOXBEeTNsWG5zanJMRjBUQmVRRmpKVUNqQ2JwQlNjbVA1RGlPOUpGTEUydjB4YzV0TzV5S015bi9wUi80RjNmdU5ROWR0a2pIRmQ3WDhSMWFvQUJ6OVc5dz09LS1sazRySnVPOXVGWFArM2Y0RWp0dFN3PT0%3D--27af64ff75173ee344ccf9b2e730a96dfc7b05c1',
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
