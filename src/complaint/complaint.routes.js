const handler = require('./complaint.handler');
const fileUpload = require('../common/fileUpload');

exports.routesConfig = (app) => {
    app.post('/api/complaint/create', fileUpload.uploadStore.fields([
        { name: 'image' }]),[handler.createComplaint]);
    app.get('/api/complaints', [handler.getComplaints]);
    app.get('/api/complaint/:complaintNo', [handler.getComplaintsByNo]);
    app.put('/api/complaints/:complaintId', [handler.updateComplaints]);
    app.post('/api/fileUpload', fileUpload.uploadStore.fields([
        { name: 'image' }]),[handler.fileUpload]);
	//app.put('/api/complaint/resetPassword',[handler.reset])
}