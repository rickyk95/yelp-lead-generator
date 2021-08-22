const puppeteer = require('puppeteer-extra')


async function getInfoHelper(page,reviews,websites){

      let numberOfReviews = await page.$eval('.css-1h1j0y3',review => {
        if(!review.innerText.includes('reviews'))  return 'No reviews'                                                           
          return review.innerText
      })
      reviews.push(numberOfReviews)
      let website = await page.$eval('p.css-1h1j0y3 a.css-ac8spe',website => {
        if(website.innerText.length === 0)  return 'No website'                                                           
            return website.innerText
      })
      websites.push(website)
}

module.exports=getInfoHelper



