const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel.js')

class tokenService{
	async generateTokens(payload){
		const accesToken = jwt.sign({payload},process.env.JWT_ACCES_SECRET,{expiresIn:'10m'})
		const refreshToken = jwt.sign({payload},process.env.JWT_REFRESH_SECRET,{expiresIn:'25d'})

		return {
			accesToken,
			refreshToken
		}
	}

	async saveToken(userId,refreshToken){
		const token = await tokenModel.findOne({user:userId})
		if(token){
			token.refreshToken = refreshToken
			return token.save()
		}
		const newToken = await tokenModel.create({user:userId,refreshToken})
		return token
	}
}

module.exports = new tokenService()