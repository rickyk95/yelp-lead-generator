const google = require('googleapis').google

const fs = require('fs')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// function googleTest(){
//     let json = fs.readFileSync('./credentials.json');
//     json = JSON.parse(json)
//     json['private_key'] = process.env.PRIVATEKEY
//     json['private_key_id'] = process.env.PRIVATEKEYID
//     json['client_id'] = process.env.CLIENTID
//     fs.writeFileSync('./credentials.json', JSON.stringify(json))
//     return json
// }

async function insertLeads(leads){
    try{
    console.log('calling lead function')
    const { reviews, websites, companyNames } = leads 
    console.log(companyNames)
    
    const auth = new google.auth.GoogleAuth({
        keyFile:'./credentials.json',
        scopes:SCOPES
    })

    const client = await auth.getClient()
    console.log('client registered')
    const sheets = google.sheets({version:'v4',client})
    console.log('version registered')

    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId:process.env.SPREADSHEETID,
        range:'Sheet1!A1',
        valueInputOption:'USER_ENTERED',
        resource:{
            values:[['Company','Website','# of Reviews']]
        }
    })

    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId:process.env.SPREADSHEETID,
        range:'Sheet1!A2',
        valueInputOption:'USER_ENTERED',
        resource:{
            majorDimension:'COLUMNS',
            values:[companyNames,websites,reviews]
        }
    },function(err,res){
            console.log(err,'this is the error')
    })

}catch(e){
        console.log(e)
        throw Error('An error was found',e)
        
}

}

module.exports = {
    insertLeads,
}