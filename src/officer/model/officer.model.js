const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const officerSchema = new Schema({
    // appNo: { type: String , default: Date.now(), unique : true},
    loginType:{type:String, default:"officer"},
    loginKey: { type: String },
    loginName: { type: String },
    loginEmail: { type: String },
    loginMobile: { type: String },
    loginPassword: { type: String },
	sroDistrict:{type:String},
	sroMandal:{type:String},
	sroOffice:{type:String},
	sroNumber:{type:String},
    loginStatus:{ type: String ,default: "" }
},{timestamps:true});

module.exports = mongoose.model("officers", officerSchema, "officers");
