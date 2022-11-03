const handler = require('./complaint.handler');

exports.routesConfig = (app) => {
    app.post('/api/complaint/create', [handler.createComplaint]);
    app.get('/api/complaints/:userId', [handler.getComplaints]);
    app.put('/api/complaints/:complaintId', [handler.updateComplaints]);
	//app.put('/api/complaint/resetPassword',[handler.reset])
}