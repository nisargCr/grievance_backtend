const userModel = require('./model/officer.model');
const jwt = require('../services/auth.service');

exports.signUp = (req) => {
    try {
        let reqObj= req.body;
        return new Promise((resolve, reject) => {
            userModel.find({loginEmail:reqObj.loginEmail})
                .then(response => {
                    if (response.length>0){
                        reject("Mail id already exists ")
                    } else{
                        userModel.create(reqObj)
                            .then(response => {
                                resolve(response instanceof userModel);
                            }).catch(err => reject(err));
                    }
                    
                })
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

exports.login = (req) => {
    try {
        return new Promise((resolve, reject) => {
            userModel.findOne({loginEmail:req.body.loginEmail,loginPassword:req.body.loginPassword},
                {_id:1,loginEmail:1,loginName:1,loginType:1,sroDistrict:1,sroMandal:1,sroOffice:1,sroNumber:1})
                .then(response => {
                    if (response){
                        const token= jwt.createToken(response._id);
                        resolve({
                            loginId:response._id,
                            loginEmail:response.loginEmail,
                            loginName:response.loginName,
                            // appNo:response.appNo,
							sroDistrict:response.sroDistrict,
							sroMandal:response.sroMandal,
							sroOffice:response.sroOffice,
							sroNumber:response.sroNumber,
                            loginType:response.loginType,
                            token:token
                        });
                    } else{
                        reject("logn failed")
                    }
                    
                })
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};