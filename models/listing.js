const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const listing = sequelize.define("listing", {
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	createdBy:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	typeOfListing: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	coverImage:{
		type: DataTypes.STRING,
	},
	projectBrief:{
		type: DataTypes.STRING,
	},
	noOfPositions:{
		type: DataTypes.INTEGER,
	},
	location:{
		type: DataTypes.STRING,
	},
	roleType:{
		type: DataTypes.STRING,
	},
	applicationDeadline:{
		type: DataTypes.DATE,
	},
	exprience:{
		type: DataTypes.INTEGER,
	},
	duration: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.STRING,
		required: true,
	}
})

module.exports = listing;