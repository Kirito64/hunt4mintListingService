const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const user = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey : true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,	
	},
	email: {
		type: DataTypes.STRING,
		required: true,
		unique: true,
	},
	userType: {
		type: DataTypes.STRING,
		required: true,
	},
	password: {
		type: DataTypes.STRING,
		requried: true,
	},
	location :{
		type: DataTypes.STRING,
		required: true,
	},
	industry: {
		type: DataTypes.STRING,
		required: true,
	}

})

module.exports = user;