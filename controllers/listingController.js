const {s3} = require("../config/aws")

const uploadToS3 = async  (file,fileName, bucket="hunt4mint")=>{
	const params = {
		Bucket: bucket,
		Key: fileName,
		Body: file,
	}
	try{
		const fileLocation = await s3.upload(params).promise()
		return fileLocation.Location
	}
	catch(err){
		throw err;
	}
}

module.exports = {
	uploadToS3
}