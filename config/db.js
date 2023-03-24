const sequelize = require('sequelize')
const Sequelize = require('./sequelize')

const db = {}

db["sequelize"] = sequelize;
db["Sequelize"] = Sequelize;


//model imports
const applicant = require('../models/applicants');
const user = require('../models/user');
const listing = require("../models/listing");

db.applicant = applicant;
db.user = user;
db.listing = listing;

module.exports = db;