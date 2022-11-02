const service = require('./users.controller');
const { Handler } = require('../common/requestHandler');

//FORMAT:  exports.<action>=(req,res)=>Handler(req,res,service.<function>,<successMessage>,<failMessage>);

exports.singup= (req, res) =>  { Handler(req, res, service.singup, 'Success', 'User signup failed') }
exports.login= (req, res) =>  { Handler(req, res, service.login, 'Success', 'User login failed') }