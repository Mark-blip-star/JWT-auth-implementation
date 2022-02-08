const tokenService = require(`../services/tokenService.js`)

module.exports = async function(req,res,next){
	try{
		const authHeader = req.headers.authorization
		if(!authHeader){
			throw new Error('unauthorized')
		}
		const accesToken = authHeader.split(` `)[1]
		const validateToken = await tokenService.validateAccesToken(accesToken)
		if(!validateToken){
			throw new Error('unauthorized')
		}
		req.user = validateToken.payload.id
		next()
	}catch(e){
		throw e
	}
}