const handler = require('./officer.handler');
const jwt = require('../services/auth.service');
const officer = require('./officer.controller')

exports.routesConfig = (app) => {
    app.post('/api/officer/signup', [handler.signUp]);
    app.post('/api/officer/login', [handler.login]);
	//app.put('/api/officer/resetPassword',[handler.reset])
}