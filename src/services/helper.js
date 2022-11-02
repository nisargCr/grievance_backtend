const idsModel = require("./model/idGenerate");
const mongoose = require("mongoose");
const getValueForNextSequence = async (sequenceOfName) => {
	let data={}
	if (sequenceOfName === "SR") {
		let srNo = await idsModel.findOne({
			sroNumber: sequenceOfName,year:new Date().getFullYear()
		});
		if (srNo === null) {
			data.year = new Date().getFullYear();
			data.sroNumber = sequenceOfName;
			data.sequenceValue= Number(1);
			const resultIds = new idsModel(data);
			await resultIds.save();
			return data.sequenceValue;
		} 
		else {
			const sNo = srNo.sequenceValue;
			const seqNo = Number(sNo) + 1;
			data = await idsModel.findOneAndUpdate(
			{ sroNumber: sequenceOfName },
			{ sequenceValue: seqNo }
			);
			return data.sequenceValue + 1
		}
	  
	}
};
  


module.exports = { 
  getValueForNextSequence
};
