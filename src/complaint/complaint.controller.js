const complaintModel = require('./model/complaint.model');

exports.createComplaint = (req) => {
    try {
        let reqObj= req.body;
        return new Promise((resolve, reject) => {
            complaintModel.create(reqObj)
                .then(response => {
                    resolve("Complaint registered succesfully");
                }).catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

exports.getComplaints = (req) => {
    try {
        return new Promise((resolve, reject) => {
            complaintModel.find({userId:req.params.userId})
                .then(response => {
                    if (response){
                        resolve(response);
                    } else{
                        reject("failed to compliant details")
                    }
                    
                })
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

exports.updateComplaints = (req) => {
    try {
        return new Promise((resolve, reject) => {
            complaintModel.findOneAndUpdate({ _id:req.params.complaintId},{$set:req.body})
                .then(details => resolve("Complaint updated succesfully"))
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};