const tokenService = require('../services/tokenService.js')

module.exports = async function(req,res,next){
	try{
		const refreshToken = req.cookies.Refresh
		const authHeader = req.headers.authorization
		const accesToken = authHeader.split(` `)[1]

		const validateRefreshToken = await tokenService.validateRefreshToken(refreshToken)
		const accesDed = await tokenService.validateAccesToken(accesToken)

		if(!accesDed || validateRefreshToken){
			res.clearCookie('Refresh')
			const tokens = await tokenService.generateTokens(req.user)
			await tokenService.saveToken(req.user,tokens.refreshToken)
			res.cookie('Refresh',tokens.refreshToken,{maxAge:20*24*60*60*1000,httpOnly:true})
			return tokens
		}
		next()
	}catch(e){
		throw e
	}
}