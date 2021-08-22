const getInfoHelper = require('./getInfoHelper.js')


async function getInfo(page,i,reviews,websites,numbers){

    try{     
        links = await page.$$('[class="css-166la90"]')
        await links[i].click()
        await page.waitFor(9000)
        await getInfoHelper(page,reviews,websites)
        await page.goBack()      
        await page.waitFor(6000)
    }catch(e){
        await getInfoHelper(page,reviews,websites)
        console.log(e)      
    }
                
}

module.exports=getInfo