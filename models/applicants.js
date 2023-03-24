const {DataTypes} = require("sequelize");
const sequelize = require('../config/sequelize');


const applicant = sequelize.define("applicant", {
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	applicantId:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	listingId:{
		type: DataTypes.INTEGER,
		allowNull: false,
	}
})
 

module.exports = applicant;