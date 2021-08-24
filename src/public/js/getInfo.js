const getInfoHelper = require('./getInfoHelper.js')

async function getInfo(page,i,reviews,websites,companyNames,company){
        
    try{     
        companyNames.push(company[i].companyName)
        await page.waitForTimeout(3000)
        await page.goto(company[i].link)
        await page.waitForTimeout(10000)
        await page.waitForTimeout(10000)
        await getInfoHelper(page,reviews,websites)
        console.log('Calling helper')
        await page.goBack()      
        await page.waitForTimeout(6000)
    }catch(e){
        await getInfoHelper(page,reviews,websites,companyNames,company)
        console.log(e)      
    }
}

module.exports=getInfo