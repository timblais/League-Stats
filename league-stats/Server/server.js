const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')

//Route Variables
const apiRoutes = require('./routes/api.js')

// .ENV setup
require('dotenv').config({path: './config/.env'})


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api', apiRoutes)


app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})   