const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')
const scrape = require('./public/js/scrape.js')
const { insertLeads } = require('./public/js/google.js')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','handlebars')
app.engine('handlebars',exphbs({}))
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

app.get('/',(req,res)=>{
    res.render('index',{layout:false})
})


app.post('/results', async (req,res)=>{
    res.send("Leads Stored")
    let leads = await scrape(req.body.businessType,req.body.location)
    insertLeads(leads)
  
})









