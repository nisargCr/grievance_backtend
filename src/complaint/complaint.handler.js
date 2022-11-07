const service = require('./complaint.controller');
const { Handler,reqHandler } = require('../common/requestHandler');

//FORMAT:  exports.<action>=(req,res)=>Handler(req,res,service.<function>,<successMessage>,<failMessage>);
exports.createComplaint = (req, res) => Handler(req, res, service.createComplaint, 'Success', 'User Details access failed');
exports.getComplaints = (req, res) => { Handler(req, res, service.getComplaints, 'Success', 'Save Failed'); }
exports.getComplaintsByNo = (req, res) => { Handler(req, res, service.getComplaintsByNo, 'Success', 'Save Failed'); }
exports.updateComplaints = (req, res) => { Handler(req, res, service.updateComplaints, 'Success', 'Save Failed'); }
//exports.reset =async (req,res)=> await reqHandler(req,res,service.resetPswrd)
