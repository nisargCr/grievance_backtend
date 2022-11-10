const userModel = require('./model/masterData.model');
const jwt = require('../services/auth.service');
const fs = require("fs");
const path = require("path");

exports.masterData = (req) => {
    try {
        let filepath = path.join(__dirname, "./state_data.json");
        const jsonString = fs.readFileSync(filepath);
        const customer = JSON.parse(jsonString);
        return new Promise((resolve, reject) => {
            userModel.create(customer)
                    .then(response => {
                        resolve("Data added");
                    }).catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};

exports.getCategories = (req) => {
    try {
        let conditionObj={}; 
        let requiredKeysObj={_id:0};
        let reqKey;
        
        if(req.query.state  && req.query.district && req.query.mandal) {
            conditionObj={
                districtName: req.query.district,
                mandalName: req.query.mandal,
            }
            //requiredKeysObj.villageName=1;
            requiredKeysObj.sroName=1;
            reqKey ="sroName"
        } else if (req.query.state && req.query.district){
            conditionObj={
                districtName: req.query.district
            }
            requiredKeysObj.mandalName=1;
            reqKey ="mandalName"
        }else {
            requiredKeysObj.districtName=1;
            reqKey ="districtName"
        }
        return new Promise((resolve, reject) => {
            userModel.find(conditionObj,requiredKeysObj)
                .then(response => {
                    if (response){
                        // if (reqKey=="villageName") {
                        //     const unique = response.filter((value, index, self) =>
                        //     index === self.findIndex((t) => (
                        //       t.villageName === value.villageName && t.sroName === value.sroName
                        //     ))
                        //   )
                        //     resolve(unique);
                        // } else {
                            const unique = [...new Set(response.map(item => item[reqKey]))]
                            resolve(unique);
                        //}
                    } else{
                        reject("feaching failed")
                    }
                    
                })
                .catch(err => reject(err));
        });
    } catch (err) {
        console.log("process error" + err.message);
    }
};
