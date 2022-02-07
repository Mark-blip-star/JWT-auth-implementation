const bcrypt = require(`bcrypt`)
const jwt = require('jsonwebtoken')
const authModel = require(`../models/authModel.js`)

const tokenService = require(`../services/tokenService`)
const validator = require(`express-validator`)

class AuthService{
	async create(login,password){
		const candidate = await authModel.findOne({login})
		if(candidate){
			throw new Error('This login is already use')
		}
		const hashPassword = await bcrypt.hash(password,4)
		const whatIs = validator.body(login).isEmail() ? 'email' : validator.body(login).isMobilePhone()?'phone':null;
		const user = await authModel.create({login,password:hashPassword})
		user.id_type = whatIs
		await user.save()

		const tokens = await tokenService.generateTokens(login)
		await tokenService.saveToken(user._id,tokens.refreshToken)
		return {
			tokens
		}
	}
}

module.exports = new AuthService()