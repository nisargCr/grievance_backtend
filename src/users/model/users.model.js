
const mongoose = require("../../services/mongoose.service").mongoose;


const userSchema = new mongoose.Schema({
    loginId: { type: String, default: "" },
    loginName: { type: String, default: "" },
    loginKey: { type: String, default: "" },
    loginEmail: { type: String, default: "" },
    loginMobile: { type: String, default: "" },
    loginPassword: { type: String, default: "" },
    loginRPassword: { type: String, default: "" },
    loginType: { type: String, default: "" },
    appNo: { type: String, unique: true }, // imp
    createdAt: { type: String, default: "" },
    status: { type: String, default: "" },
	
},{timestamps:true})





module.exports = mongoose.model("users", userSchema);
