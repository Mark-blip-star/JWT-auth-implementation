const express = require(`express`)
const https = require(`https`)
const infoService = require(`../services/infoService.js`)
//===================================
class infoController {
	async getUserInfo(req,res,next){
		const userId = req.user
		const info = await infoService.getUserInfo(userId)
		res.json(info.dtoUser)
	}

	async getServiceLatency(req,response,next){
		let url = 'https://www.google.com';

		let time = Date.now()
		let endTime = 0
		https.get(url,(res) => {
			let body = ``;

			res.on(`data`,(chunk)=> {
				body+=chunk
			})

			res.on(`end`,() => {
				endTime = Date.now() - time;
				response.json({endTime})
			})
		})
	}
}
module.exports = new infoController()
