const puppeteer = require('puppeteer-extra')


async function getInfoHelper(page,reviews,websites){

     try{
          let numberOfReviews = await page.$eval('.css-1h1j0y3',review => {
            if(!review.innerText.includes('reviews'))  return 'No Reviews'                                                         
              return review.innerText
          })

          if(numberOfReviews === 'No Reviews') {
            console.log(numberOfReviews,'This is #reviews')
            numberOfReviews = await page.$eval('.css-bq71j2',review => {
              if(!review.innerText.includes('reviews'))  return 'No Reviews'                                                         
                return review.innerText
            })
          }

          reviews.push(numberOfReviews)
      
          let website = await page.$eval('p.css-1h1j0y3 a.css-ac8spe',website => {
            if(website.innerText.includes('Get Directions'))  return 'No website'                                                           
                return website.innerText
          })
          websites.push(website)

    }catch(e){

      reviews.push(numberOfReviews)
      
      let website = await page.$eval('p.css-1h1j0y3 a.css-ac8spe',website => {
        if(website.innerText.includes('Get Directions'))  return 'No website'                                                           
            return website.innerText
      })
      websites.push(website)


    }

}

module.exports=getInfoHelper



