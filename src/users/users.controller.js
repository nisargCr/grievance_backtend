const userModel = require('./model/users.model');
const jwt = require('../services/auth.service');

exports.singup = (req) => {
    try {
        let reqObj= req.body;
        return new Promise((resolve, reject) => {
            userModel.find({loginEmail:req.body.loginEmail})
                .then(async response => {
                    if (response.length>0){
                        reject("Mail id already exists ")
                    } else{
                        reqObj.appNo=Date.now();
                        userModel.create(reqObj)
                            .then(response => {
                                resolve("User created succesfully");
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
            userModel.findOne({loginEmail:req.body.loginEmail},
                {_id:1,loginEmail:1,appNo:1,loginName:1,loginType:1,status:1,loginPassword:1})
                .then(response => {
                    if (response){
                        const token= jwt.createToken(response._id);
                        if (response.loginPassword===req.body.loginPassword) {
                            resolve({
                                loginId:response._id,
                                loginEmail:response.loginEmail,
                                loginName:response.loginName,
                                appNo:response.appNo,
                                loginType:response.loginType,
                                status:response.status,
                                token:token
                            });
                        }else{
                            reject("You have entered an invalid password");
                        }
                        
                    } else{
                        reject("You have entered an invalid email");
                    }
                    
                })
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

// exports.forgotPassword = async (req) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//               user: testAccount.user, // generated ethereal user
//               pass: testAccount.pass, // generated ethereal password
//             },
//           });
//           // send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: '"Fred Foo 👻" <foo@example.com>', // sender address
//             to: "bar@example.com, baz@example.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         });
//         return new Promise((resolve, reject) => {
//             userModel.find({loginEmail:req.body.loginEmail,loginMobile:req.body.loginMobile})
//                 .then(response => {
//                     if (response.length==0){
//                         reject("No user exists with this credentials ")
//                     } else{
                        
//                     }
//                 })
//                 .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };

// exports.getUserAll = () => {
//     try {
//         return new Promise((resolve, reject) => {
//             userModel.find()
//                 .then(response => resolve(response))
//                 .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };

// exports.resetPassword = (req) => {
//     try {
//         return new Promise((resolve, reject) => {
//             if (req.body.loginType=="user") {
//                 userModel.findOneAndUpdate({ _id:req.body.loginId},{$set:{loginPassword:req.body.loginPassword}})
//                         .then(details => resolve("Password changed succesfully"))
//                         .catch(err => reject(err));
//             } else {
//                 officerModel.findOneAndUpdate({ _id:req.body.loginId},{$set:{loginPassword:req.body.loginPassword}})
//                         .then(details => resolve("Password changed succesfully"))
//                         .catch(err => reject(err));
//             }
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };

// exports.getUserById = (data) => {
//     try {
//         return new Promise((resolve, reject) => {
//             userModel.find({ _id: data })
//                 .then(response => resolve(response))
//                 .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };

// exports.getUserByAppNo = (req) => {
//     try {
//         return new Promise((resolve, reject) => {
//             userModel.find({ appNo: req.params.id })
//                 .then(response => resolve(response))
//                 .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };
// exports.fileUpload = async(req) => {
//     try {
//         const ipAddress = IP.address();
//         let tempObj= {
//             fileName:req.params.fileName,
//             filePath:req.files.image[0].path,
//             downloadLink: `http://${ipAddress}:${req.socket.localPort}/uploads/${req.params.userId}/${req.params.fileName}.png`
//         }
//         return new Promise((resolve, reject) => {
//             userModel.findOneAndUpdate({ _id:req.params.userId,documents:{$nin:tempObj}},{$push:{documents:tempObj}})
//                         .then(details => resolve("Image added succesfully"))
//                         .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// };
// exports.saveUser = (req) => {
//     try {
//         return new Promise((resolve, reject) => {
//             let userId=req.body.loginId;
//             let users = req.body;
//             delete users.loginId;
//             if (req.body.marriageDate) {
//                 var husbentDate= req.body.husbandDateofBirth.split("-");
//                 var wifeDate= req.body.wifeDateofBirth.split("-");
//                 var marriageDate = req.body.marriageDate.split("-");
//                 var a = moment([parseInt(husbentDate[0]),parseInt(husbentDate[1])]);
//                 var b = moment([parseInt(wifeDate[0]),parseInt(wifeDate[1])]);
//                 var c = moment([parseInt(marriageDate[0]),parseInt(marriageDate[1])]);
//                 var hubendAge= c.diff(a, 'years');       // 1
//                 var wifeAge= c.diff(b, 'years'); 
//                 console.log(hubendAge,wifeAge);
//             } 
//             userModel.findOneAndUpdate({ _id:userId},{$set:users})
//                         .then(details => resolve("User details updated succesfully"))
//                         .catch(err => reject(err));
//         });
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// exports.getUserList = (req) => {
//     try {
//         return new Promise((resolve, reject) => {
//             userModel.find({status:"pending",sroOffice:req.params.sroOffice,slotDate:{$lte:moment().format('YYYY-MM-DD')}
//             }, {
//                 "id": 1,
//                 "appNo":1,
//                 "status": 1,
//                 "husbandName": 1,
//                 "wifeName_beforeMarriage":1,
//                 "wifeName_afterMarriage": 1,
//                 "change_wifeName_to_afterMarriage":1,
//                 "marriageType": 1,
//                 "regDate": 1,
//                 "slotDate": 1,
//                 "slotTime": 1,
//                 "sroOffice": 1,
//             }
//             )
//                 .then(response => resolve(response))
//                 .catch(err => reject(err));
//         });
//     } catch (err) {
//         console.log("process error" + err.message);
//     }
// }
