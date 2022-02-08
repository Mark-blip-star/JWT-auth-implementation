const express = require(`express`)
const router = express.Router()
const infoController = require('../controllers/infoController.js')
const authMiddle = require(`../middlewares/authCheck.js`)


router.get(`/info`,authMiddle,infoController.getUserInfo)


module.exports = router