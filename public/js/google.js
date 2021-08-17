const google = require('googleapis').google

const fs = require('fs')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

async function insertLeads(){

    const auth = new google.auth.GoogleAuth({
        keyFile:'credentials2.json',
        scopes:SCOPES
    })

    const client = await auth.getClient()
    const sheets = google.sheets({version:'v4',client})
    // const spreadsheetId = '1EmUYfnADnAab7YzZjBsnpcoY7F8GBUVIYiAjTVz0tbk';

    console.log('Written')

    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId:process.env.SPREADSHEETID,
        range:'Sheet1',
        valueInputOption:'RAW',
        resource:{
            values:[['fifa','2021','2022']]
        }
    })

}

function googleTest(){
    let json = fs.readFileSync('credentials.json');
    json = JSON.parse(json)
    json['private_key_id']= process.env.CLIENTID
    fs.writeFileSync('credentials2.json', JSON.stringify(json))
    console.log('hecho')
}




module.exports = {
    insertLeads,
    googleTest
}