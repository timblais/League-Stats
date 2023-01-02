const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index') 

router.get('/:id', indexController.getPlayer)

module.exports = router