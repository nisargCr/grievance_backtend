const mongoose = require('mongoose')

const uniqueSchema = new mongoose.Schema({
    sroNumber: {
        type: String,
        required: true
    },
    sequenceValue:{
        type: Number,
        required: true
    },
	year:{
		type:String
	}


})
module.exports = mongoose.model('UsersUniqueId',uniqueSchema)