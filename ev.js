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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=R4XNWWXCajuxgP2cf44cffa29b4f9df4d6d9d0cbf9&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'anAzSlYzMGJhYUFFN2ZxZElYYTRodGNTMmlhRExFY3pHUkh0aFlaczM3cGhBUnJySVZ3TWNTYnRFZkcyelJ0U0JoQ1lhYnE1Mnk5RTJiZGNua1laQWZzZGcrODk5NmVVK2l5RmRWWXdkQkdyQVlxMWYvdlI5bGNPa0xPYS9uU2FVeFltOVhXTFh5RkxldWZmZk5YQ2l6Qmt0Sk5pZmRtKzZTVkZYUG5JNzljelZnalNGWnM2cnhibzVQYVF0TThsek44RnN4N01mZ05LVys2bjdhc3hwY3FXN1NMbXNwZU54TXAwN3dDZm00Vmp0WndDeWtxbGNLejBJQktGSm1WeFlaRnZVREhyM3RURTM0czhkaUtpd2tnY2NmTnRVN1drTGlaanhrTFo1QjVENHFZa2N3bFBJNmZpTW1sczB6M09hdUJQNEdvOWFBRHZQZmp0Ulp1bzdhblg3aFBWeW1rVWFJN1pLT0docjFjVnk0Ym1oNCtCSCtIQzdZMCtnVWVnYXNxWnpwdnRXUXBtRUVvSkphUWVDdz09LS1YK2Q5TWZGRkovVUZGOFdIL0JwejhnPT0%3D--a48bc5bbf6518a25fca55fa3a9675bee27acf57f',
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
