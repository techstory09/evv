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
            browserWSEndpoint: `wss://production-sfo.browserless.io?&token=QwfG2rdB2BcZPl6f0dcd17300e304bdb533cd2acae&--proxy-server=http://45.249.104.143:6438`,
        });

        const page = await browser.newPage();
    
        await page.authenticate({
            username: 'msnmmayl',
            password: '626he4yucyln',
        });

        // Set cookies
        await page.setCookie({
            name: '_elements_session_4',
            value: 'N1orYk1LaTJXcC84OTZTWjk4VjM4RjFRcVpzY3VNYXVUcVQ2L0pWOTRtVUJsQmlRK2llSkg5bWdMcmtoUzZUN0VCRWU4MEgyVEJqcldTbEVVSTVOSzZFaFNZSUtOZ0U3eTcrZUJpb2ZBNVdHVGF5cWNyRTN2NEozZVhIcUJ3OXBSTTRkcXFzRk5NaGQxYTMvbjBZMlZqZXBLenN2RmlNZG9YL0JTbU5Wa1pHbkF4SUhMZTRhaDdwVDJtNXZSbmxWelhuYkUrQVNZcmY5WFFDajJodmJwKzE1TnF1Z2JSK0FFaHBveGJqelM3OS92dEJTendxR0ppVUlma2Q0aHBkaEl0NGluWWtHTURkOWo1L0xvVXhObGZ3L1hRWGhoOGduRlpsRmdDZGV0Tll5Sjh4NTZjSWJKcHRTd25yRnMwY1V6M0dKYVlKVVhkRHc4SVUwVU54aXhGazV4M2o1OWJFSkhMMURHcS9PRWRHUDFYSmlSUkRiNTdMV0ROUCtVNFZwWE8wdVNTSS8zMDlSaCt6VTlaWmV6dz09LS12bzBWSGRZMFRHRzY1QW5VeXcyMDlRPT0%3D--e10b0807655b21348654595273a17e1b55c684e9',
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
