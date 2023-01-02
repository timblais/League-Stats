const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api') 

router.get('/:id', apiController.getPlayer)

module.exports = router