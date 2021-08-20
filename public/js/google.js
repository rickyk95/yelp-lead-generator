const google = require('googleapis').google

const fs = require('fs')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function googleTest(){
    let json = fs.readFileSync('credentials.json');
    json = JSON.parse(json)
    json['private_key'] = process.env.PRIVATEKEY
    json['private_key_id'] = process.env.PRIVATEKEYID
    json['client_id'] = process.env.CLIENTID

    fs.writeFileSync('credentials.json', JSON.stringify(json))
    return json
    
}

async function insertLeads(leads){
    let credentials = googleTest()
    console.log('calling lead function')
    console.log(leads)
    const { websites, reviews, companyNames } = leads 
    console.log(reviews,websites,companyNames)
    const auth = new google.auth.GoogleAuth({
        keyFile:'./credentials.json',
        scopes:SCOPES
    })
    const client = await auth.getClient()
    const sheets = google.sheets({version:'v4',client})
    // const spreadsheetId = '1EmUYfnADnAab7YzZjBsnpcoY7F8GBUVIYiAjTVz0tbk';
    console.log('Written')
    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId:process.env.SPREADSHEETID,
        range:'Sheet1!A1',
      
        valueInputOption:'USER_ENTERED',
        resource:{
            majorDimension:'COLUMNS',
            values:[websites,reviews,companyNames]
        }
    })

    credentials['private_key_id'] = ' ';
    credentials['private_key'] = ' ';
    credentials['client_id'] = ' ';
    fs.writeFileSync('credentials.json',JSON.stringify(credentials))
}

module.exports = {
    insertLeads,
}