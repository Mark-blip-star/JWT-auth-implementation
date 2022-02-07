const mongoose = require('mongoose')

const User = new mongoose.Schema({
	login:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	id_type:{
		type:String,
	}
})

module.exports = mongoose.model('User',User)