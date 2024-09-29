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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=Qw8JDIKqaB7nCS3253bd954e2c65fa9f0171e9c52b&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'b1N0WjFxSWNxM1d4QXhuUmx2aEhrVjJ2bkdEbi9Ma0diOFg5am9aK0Job1NJVFFmb2Z1emJUL2RsT0pIeWwwQ0dHMUc2OVZCVGpQcmJYWVpFUHhielpBdXFwMjdyWjJVbjBQb1poa3I0a1ZTUEY0aUc5ejdQa3VNN2RuMXpnRUNjZkNLQm9iWmtRQTR1VDJPN2srOTNKeXNhSXdjdGFZVXkzTU4rYnNVZnF1dTlXZVU5SExNRGFiMXNRS0hMSkR5QmNOcFRvWG1LelFiU2RDcnlkT3lZYXVnQ2RaYTM2QWthbmFpMUE1L3N4Z1p5V21xTlc0MEZWMU9jMkw1aGNra1RBd2IyTDR1REVPTm84TWJMdGkwVnZpTC9xcDFra3R0MHZGVklta052c3lDUW0yVkEzQzVjelhzMHNHYmlBN1BkVFdRUlpDNmxwaVpGTnRGVlMxMHkwSjVYVFBmYllwUHprR29kYmRQZ1JOREszNDB5NnZ1VDQyYVVJUUo4NC84U2puQU80NnB4dlhSWTVLVytFM0pvdz09LS04ZDNjaFhuYm5weWU1eTRueWhjVTdnPT0%3D--24c708c9ce2a99fd6bb2c90250324b83b3ef083b',
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
