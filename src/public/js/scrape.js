const puppeteer = require('puppeteer-extra')
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const getInfo = require('./getInfo.js')
const parseUrl = require('./parseUrl.js')
puppeteer.use(stealthPlugin())



async function scrape(businessType,businessLocation){
    var reviews = [];
    var websites =[];
    var companyNames = [];
    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'],headless:true, defaultViewport: {
        width:1920,
        height:1080
      }})

    let url = parseUrl(businessType,businessLocation)
    const page =  await browser.newPage()
    await page.goto(url,{timeout:0})
    await page.waitFor(8000)
    let links = await page.$$('[class="css-166la90"]') 
    console.log(links.length,'links length1')

        const companies = await page.$$eval('[class="css-166la90"]',(companies) => {
          return companies.map((company)=>{
              console.log(company)
              return {companyName:company.innerText,link:company.href}
          })
    })

    console.log(companies)
    
    for (let i = 2; i < 3;i++){
      try{
          await getInfo(page,i,reviews,websites,companyNames,companies)
      }catch(e){    
        console.log(e)
      }
   }

    await browser.close()
    console.log(reviews,websites,companyNames)
    return {reviews,websites,companyNames}
}

module.exports=scrape
