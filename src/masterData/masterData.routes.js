const handler = require('./masterData.handler');
const jwt = require('../services/auth.service');

exports.routesConfig = (app) => {
    app.post('/api/v1/masterdata', [handler.masterData]);
    app.get('/api/categories', [handler.getCategories]);
}