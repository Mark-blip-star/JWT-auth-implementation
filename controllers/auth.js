const express = require(`express`)
const router = express.Router()

const AuthService = require('../services/authService.js')
//===================================
class authController {
	async register(req,res,next){
		const {login, password} = req.body
		const user = await AuthService.create(login,password)
		res.cookie('Refresh',user.tokens.refreshToken,{maxAge:20*24*60*60*1000,httpOnly:true})
		res.json(user.tokens)
	}

	async login(req,res,next){
		const {login,password} = req.body
		const user = await AuthService.login(login,password)
		res.cookie('Refresh',user.tokens.refreshToken,{maxAge:20*24*60*60*1000,httpOnly:true})
		res.json(user.tokens)
	}

	async logout(req,res,next){
		const Refresh = req.cookies;
		const logoutParam = req.params.all
		const token = await AuthService.logout(Refresh,logoutParam)
		res.clearCookie(`Refresh`)
		res.json({"exit":`with param ${logoutParam}`})
	}
}

module.exports = new authController()
