const getInfoHelper = require('./getInfoHelper.js')


async function getInfo(page,i,reviews,websites,companyNames,company){

    try{     
        companyNames.push(company[i].companyName)
        await page.waitFor(3000)
        await page.goto(company[i].link)
        await page.waitFor(3000)
        await getInfoHelper(page,reviews,websites)
        // await page.goBack()      
        // await page.waitFor(6000)
    }catch(e){
        await getInfoHelper(page,reviews,websites,companyNames,company)
        console.log(e)      
    }
}

module.exports=getInfo