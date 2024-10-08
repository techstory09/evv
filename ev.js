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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QzSBCD6BWjrd3Qe1f3be30cf5ee923a4d4da18f1a2&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'bG9QeE0wSlpFMzhEVzZxZmx4MnN1YzlxVW8wU05uMlpsUmdJN3F1aGQyV240S0V4MlRjdzEzUVQwQVNwS0dXT2ZzZHpsNFh0SkliQ0ttWmtCeGQ4VVptaTUwZjFZdU95a1VDTXFWN0hGR2RLeFZpU3IraEl2NFJSSytNWjlEUDNodStCN3VXc0RjWW8xZXZjQ2pZbTk5Zjg0c3lPQ25sYTlwRDZhbnBlVjNvcmRwdHQycmJtalVZYTdhcTJ0azJVVWZRQVBURzBORkNnVThkZlE0YzRERzFkZUNKeGFVTktacnRsZ0thNUJjYjJ1cEIvaG9vM2tiWTRra05uSzdnSi96aXAwNGZ0UXhzampUakFEcHZVRVRKTUJwcnR4VUJxL3pCay9KVnAzUFVzYlJmM0c3NDczNFIrUUlDWkJDTE9qeDNHeXhQLy93M3pyNmRFMVIxWExSbGJEcW53NVMzZ1ppdmdBeEVmZUVpcWxhU1hnNC9OU1F6RkVyeXRjeEtudFVQck9Wa0pWZVpJcTFRM1gwOGQ4QT09LS1wM3IrYWY2SWE4b2Rsak53OU83Sk1nPT0%3D--e35cef9fb87e6c64da7939e913ade329c730f52d',
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
