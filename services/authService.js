const bcrypt = require(`bcrypt`)
const jwt = require('jsonwebtoken')
const authModel = require(`../models/authModel.js`)

const tokenService = require(`./tokenService`)
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

	async login(id,password){
		const candidate = await authModel.findOne({login:id})
		if(!candidate){
			throw new Error('User not found')
		}
		const comparePassword = await bcrypt.compare(password,candidate.password)
		if(!comparePassword){
			throw new Error('wrong password')
		}
		const tokens = await tokenService.generateTokens({id})
		await tokenService.saveToken(candidate._id,tokens.refreshToken)
		return {
			tokens
		}
	}

	async logout(refreshToken,logoutParam){
		if(logoutParam === false){
			const token = await tokenService.removeToken({refreshToken})
			return token;
		}
		await tokenService.removeAll()
	}		
}

module.exports = new AuthService()