const authModel = require(`../models/authModel.js`)
const userDto = require(`../dto/userInfo.js`)
class infoService{
	async getUserInfo(id){
		const user = await authModel.findOne({login:id})
		const dtoUser = new userDto(user)
		return {
			dtoUser
		}
	}
}

module.exports = new infoService()