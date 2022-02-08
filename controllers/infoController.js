const express = require(`express`)
const router = express.Router()

const infoService = require(`../services/infoService.js`)
//===================================
class infoController {
	async getUserInfo(req,res,next){
		const userId = req.user
		const info = await infoService.getUserInfo(userId)
		res.json(info.dtoUser)
	}
}

module.exports = new infoController()
