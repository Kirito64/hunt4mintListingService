const sequelize = require("sequelize");


const Sequelize = new sequelize("postgres://hunt4mint:hunt4mint@43.205.223.94:5432/hunt4mint");

module.exports = Sequelize;