module.exports = class userInfoDto{
	id_type;
	id
	constructor(model){
		this.id = model.login,
		this.id_type = model.id_type
	}
}
