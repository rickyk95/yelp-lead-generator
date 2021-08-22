function parseUrlHelper(parameter){

    if(!parameter.includes(' ')){
      return parameter
    } 
     else if (parameter.includes(' ') && parameter.split(' ').length === 2){
      return parameter.split(' ')[0] + "%20" + parameter.split(' ')[1]
    }
    else if(parameter.includes(' ') && parameter.split(' ').length === 3){
      return parameter.split(' ')[0] + "%20" + parameter.split(' ')[1] + "%20" + parameter.split(' ')[2] 
    }  
  
  } 

module.exports=parseUrlHelper
