const parseUrlHelper = require('./parseUrlHelper')

function parseUrl(businessType,businessLocation){
    let parameters = [businessType,businessLocation];
    let queryParameter1;
    let queryParameter2;
    for(var i = 0; i < parameters.length;i++){
           if(queryParameter1){
                queryParameter2 = parseUrlHelper(parameters[i]) 
           } else{
                queryParameter1 = parseUrlHelper(parameters[i])
           }   
    }
   return  `https://www.yelp.com/search?find_desc=${queryParameter1}&find_loc=${queryParameter2}`

}

module.exports=parseUrl