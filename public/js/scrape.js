const puppeteer = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealthPlugin())

async function scrape(businessType,businessLocation){

    const browser = await puppeteer.launch({headless:false,  defaultViewport: {
        width:1920,
        height:1080
      }})

    const page =  await browser.newPage()

    await page.goto(`https://www.yelp.com/search?find_desc=${businessType}&find_loc=${businessLocation}`)

    await page.$$eval('.css-166la90',array => {

        array.forEach((item)=>{
            console.log(item.innerHTML)
        })
    })

}


module.exports=scrape
