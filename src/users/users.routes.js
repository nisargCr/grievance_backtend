const handler = require('./users.handler');
const fileUpload = require('../common/fileUpload');
const jwt = require('../services/auth.service');

exports.routesConfig = function (app) {
    app.post('/api/signup', [handler.singup]);
    app.post('/api/login', [handler.login]);
}