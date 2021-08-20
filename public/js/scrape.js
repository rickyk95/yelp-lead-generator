const puppeteer = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const getInfo = require('./getInfo.js')
const parseUrl = require('./parseUrl.js')
puppeteer.use(stealthPlugin())

var reviews = [];
var websites =[];
var numbers = [];

async function scrape(businessType,businessLocation){

    const browser = await puppeteer.launch({headless:true,  defaultViewport: {
        width:1920,
        height:1080
      }})

    let url = parseUrl(businessType,businessLocation)
    const page =  await browser.newPage()
    await page.goto(url,{timeout:0})
    await page.waitFor(8000)
    let links = await page.$$('[class="css-166la90"]') 
    
    for (let i = 0; i < links.length;i++){
      try{
          await getInfo(page,i,reviews,websites,numbers)
      }catch(e){    
        console.log(e)
      }
   }

    const companyNames = await page.$$eval('[class="css-166la90"]',(names) => {
        return names.map((name)=>{
            return name.innerText
        })
    })
    console.log(reviews,websites,companyNames)
    return {reviews,websites,companyNames}
}

module.exports=scrape
