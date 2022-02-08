const express = require(`express`)
const authController = require(`../controllers/auth.js`)
const authMiddle = require(`../middlewares/authCheck.js`)
const router = express.Router()

router.post(`/signin`,authController.login)
router.post(`/signup`,authController.register)
router.get(`/logout/:all`,authController.logout)


module.exports = router