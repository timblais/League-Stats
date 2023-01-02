const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')

//Route Variables
// const indexRoutes = require('./routes/index.js')

// .ENV setup
require('dotenv').config({path: './config/.env'})


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
// app.use('/', indexRoutes)
app.get('/api/:id', async (req, res) => {
    try {
      let response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${process.env.LOL_API_KEY}`)
      let player = await response.json()
      console.log(player)
      res.json(player);
    } catch (err) {
      console.log(err);
    }
  })

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})   