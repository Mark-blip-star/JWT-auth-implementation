const mongoose = require('mongoose')

const Token = new mongoose.Schema({
	user:{
		type:mongoose.SchemaTypes.ObjectId,
		ref:'User'
	},
	refreshToken:{
		type:String,
		required:true
	}
})

module.exports = mongoose.model('Token',Token)