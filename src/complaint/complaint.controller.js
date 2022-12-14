const complaintModel = require('./model/complaint.model');

exports.createComplaint = (req) => {
    try {
        let reqObj= req.body;
        reqObj.complaintNo=`GN${Date.now()}`;
        return new Promise((resolve, reject) => {
            complaintModel.create(reqObj)
                .then(response => {
                    console.log("--data--",response);
                    resolve({complaintNo:reqObj.complaintNo});
                }).catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

exports.fileUpload = (req) => {
    try {
        console.log("coming here");
        const [local, rest] = req.get("host").split(":");
		let Url =
        local === "localhost"
        ? req.protocol + "://" + req.get("host") + "/complaints"
        : "http://" + req.get("host") + "/complaints";
        let tempObj= {
            fileName:req.files.image[0].filename,
            filePath:req.files.image[0].path,
            downloadLink: `${Url}/${req.files.image[0].filename}`,
			timeStamp:new Date()
        }
        return new Promise((resolve, reject) => {
            resolve(tempObj);
        })
        

    } catch (err) {
        console.log("process error" + err.message);
    }
}

exports.getComplaints = (req) => {
    try {
        return new Promise((resolve, reject) => {
            complaintModel.find({}).sort({createdAt:-1})
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
exports.getComplaintsByNo = (req) => {
    try {
        return new Promise((resolve, reject) => {
            complaintModel.find({complaintNo:req.params.complaintNo})
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