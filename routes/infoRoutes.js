const express = require(`express`)
const router = express.Router()
const infoController = require('../controllers/infoController.js')
const authMiddle = require(`../middlewares/authCheck.js`)
const refreshJWT = require(`../middlewares/refreshToken.js`)


router.get(`/info`,authMiddle,refreshJWT,infoController.getUserInfo)
router.get(`/latency`,authMiddle,refreshJWT,infoController.getServiceLatency)

module.exports = router