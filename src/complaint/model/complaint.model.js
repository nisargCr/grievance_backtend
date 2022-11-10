const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const officerSchema = new Schema({
    // appNo: { type: String , default: Date.now(), unique : true},
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     ref:'users'
    // },
    complaintNo:{
        type: String, unique: true
    },
    personName:{type:String},
    contactNumber: { type: String },
    email: { type: String },
    district: { type: String },
    mandal: { type: String },
    sro: { type: String },
	districtRegisterName:{type:String},
	gravianceClassification:{type:String},
	subject:{type:String},
	description:{type:String},
    documents:{ type: Array },
    createdAt: { type: Date, default: Date.now },
    complaintStatus: { type: String, default: "" },
    status: { type: Boolean, default: true }
});

module.exports = mongoose.model("complaint", officerSchema, "complaint");
