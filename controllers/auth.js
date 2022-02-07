const express = require(`express`)
const router = express.Router()

const AuthService = require('../services/auth')
//===================================
router.get(`/signin`,async(req,res) => {
	const {login, password} = req.body
	const user = await AuthService.create(login,password)
	res.cookie('Refresh',user.tokens.refreshToken,{maxAge:20*24*60*60*1000,httpOnly:true})
	res.json(user.tokens)
})

router.get(`/signup`,(req,res) => {
	console.log('hi')
})

module.exports = router