const puppeteer = require('puppeteer');

const searchGoogle = async (searchQuery) => {
    

    const browser = await puppeteer.launch({
        executablePath: 'chrome.exe',
        headless: false
        });



    const page = await browser.newPage();
    await page.goto('https://google.com');

    await page.type('input[name="q"]', searchQuery);
    
    await page.$eval('input[name=btnK]', button => button.click());

    await page.waitForSelector('div[id=search]');

    const searchResults = await page.$$eval('div[class=g]', results => {
        let data = [];
        console.log(results);
        //Iterate over all the results
        results.forEach(parent => {

            //Check if parent has h2 with text 'Web Results'
            const ele = parent.querySelector('h2');
            console.log(ele);
            //If element with 'Web Results' Title is not found  then continue to next element
            if (ele === null) {
                return;
            }

            //Check if parent contains 1 div with class 'g' or contains many but nested in div with class 'srg'
            let gCount = parent.querySelectorAll('div[class=tF2Cxc]');
            console.log(gCount);
            //If there is no div with class 'g' that means there must be a group of 'g's in class 'srg'
            //if (gCount.length === 0) {
                //Targets all the divs with class 'g' stored in div with class 'srg'
            //    gCount = parent.querySelectorAll('div[class=srg] > div[class=g]');
            //}

            //Iterate over all the divs with class 'g'
            gCount.forEach(result => {
                //Target the title
                if(result.querySelector('div[class=yuRUbf] > a')===null || result.querySelector('div[class=IsZvec] > span > span')===null){
                    return;
                }
                const title = result.querySelector('div[class=yuRUbf] > a >  h3').innerText;

                //Target the url
                const url = result.querySelector('div[class=yuRUbf] > a').href;

                //Target the description
                const description = result.querySelector('div[class=IsZvec] > span > span').innerText;

                //Add to the return Array
                data.push({title, description, url});
            });
        });

        //Return the search results
        return data;
    });

   // await page.screenshot({path: 'example.png'});
   let pages = await browser.pages();
   for (const page of pages) {
       await page.close();
   }
   await browser.close();
    return searchResults;

};

module.exports = searchGoogle;

//searchGoogle('cats');



