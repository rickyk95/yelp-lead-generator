const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')
const scrape = require('./public/js/scrape.js')
const { insertLeads } = require('./public/js/google.js')
const { googleTest } = require('./public/js/google.js')



insertLeads()

// scrape('Dougnuts','New Jersey')
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'public')))
// app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','handlebars')
app.engine('handlebars',exphbs({}))
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
app.get('/',(req,res)=>{
    res.render('index',{layout:false})
})
app.post('/results', async (req,res)=>{
    const businessType = req.body.businessType;
    const location = req.body.location;
})

// let json = fs.readFileSync('test.json');
// json = JSON.parse(json)
// json['Luisooo'] = 'Cruzooo';
// fs.writeFileSync('test.json', JSON.stringify(json))
    


