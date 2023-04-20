
const router = require('express').Router();
const db = require("../config/db");

router.get("/getAllAuditions" , async (req, res)=>{
	console.log(req.user)
	try{
		const auditions = await db.listing.findAll({where:{
			typeOfListing: "audition",
		}})
		res.status(200).send(auditions)
	}
	catch(err){
		console.log(err)
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.post("/newAudition", async (req, res) => {

	let data  = req.body;
	const user = req.user.id; 
	data.createdBy = user;
	try{
		const userdata = await db.user.findOne({where: {id : user}})
		if(!userdata){
			res.status(500).send({message: "internal server error"})
		}
		else if(userdata.userType  !== "client"){
			res.status(403).send({message: "User cannot create a project"})
		}
		data.typeOfListing = "audition";
		const dataReconstrued = {...data}
		dataReconstrued.coverImage = await uploadToS3(req.files.file.data, req.files.file.name)
		const newAudition = await db.listing.create(dataReconstrued);
		res.status(200).send({message: "Audition Created", data: newAudition});
	}
	catch(err){
		console.log(err);
		res.status(500).send({message: "Error in createing a new audition", err})
	}
})

router.get("/getAllProjects" , async (req, res)=>{

	try{
		const auditions = await db.listing.findAll({where:{
			typeOfListing: "project",
		}})
		res.status(200).send(auditions)
	}
	catch(err){
		console.log(err);
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.post("/newProject", async (req, res) => {

	let data  = req.body;
	let user = req.user.id; 
	data.createdBy = user;
	data.typeOfListing = "project"
	try{
		const userdata = await db.user.findOne({where: {id : user}})
		if(!userdata){
			res.status(500).send({message: "internal server error"})
		}
		else if(userdata.userType  !== "client"){
			res.status(403).send({message: "User cannot create a project"})
		}
		const dataReconstrued = {...data}
		dataReconstrued.coverImage = await uploadToS3(req.files.file.data, req.files.file.name)
		const newAudition = await db.listing.create(dataReconstrued);
		res.status(200).send({message: "Audition Created", data: newAudition});
	}
	catch(err){
		console.log(err);
		res.status(500).send({message: "Error in createing a new audition"})
	}
})

router.get("/projects", async(req, res)=>{
	let user = req.user.id;
	console.log(user)
	try{
		const projects = await db.listing.findAll({where:{createdBy: user, typeOfListing: "project"}, order: ["createdAt"]})
		res.status(200).send(projects)

	}
	catch(err){
		console.log(err)
		res.status(500).send({message: "Internal Server Error"})
	}
})
router.get("/projects/:userId", async(req, res) => {
	let user = req.params.user;
	try{
		const projects = await db.listing.findAll({where:{createdBy: user, typeOfListing: "project"}, order: ["createdAt"]})
		res.status(200).send(projects)

	}
	catch(err){
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.get("/auditions/:userId", async(req, res) => {
	let user = req.params.user;
	try{
		const projects = await db.listing.findAll({where:{createdBy: user, typeOfListing: "project"}, order: ["createdAt"]})
		res.status(200).send(projects)

	}
	catch(err){
		res.status(500).send({message: "Internal Server Error"})
	}
})


router.post("/applyToListing", async (req, res) => {
	const listingId = req.body.listingId;
	const applicantId = req.body.applicantId;
	try{
		let data = {};
		data.listingId = listingId;
		data.applicantId = applicantId;
		data.applicationStatus = "Pending"

		const newApplication = await db.applicant.create(data);
		res.status(200).send({message: "Succesfully Appplied to listing", data: newApplication})
	}
	catch(err){
		res.status(500).send({message: "Unexpected error occured while Applying", data: err.data})
	}
})

router.put("/updateApplication", async(req, res)=>{
	const id = req.body.id; 
	const newStatus = req.body.status; 

	try{
		let data = {};
		data.ApplicationStatus = newStatus;

		const updateApplication = await db.applicant.updateOne(data, {where: {"id": id}})
		res.status(204).send({message: "Updated Sucessfully", data: updateApplication})

	}
	catch(err){
		res.status(500).send({message: "Unexpected error occured while Applying", data: err.data})
	}

})

router.get("/getUserAuditions", async (req,res)=>{
	let user = req.user.id;
	try{
		const auditions = await db.listing.findAll({where:{
			typeOfListing: "audition",
			createdBy: user
		}})
		res.status(200).send(auditions)
	}
	catch(err){
		console.log(err)
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.get("/getUserProjects", async (req,res)=>{
	let user = req.user.id;
	
	if(!user) {
		res.status(400).send("Invalid User")
		return;
	}
	try{
		const projects = await db.listing.findAll({where:{
			typeOfListing: "projects",
			createdBy: user
		}})
		res.status(200).send(projects)
	}
	catch(err){
		console.log(err)
		res.status(500).send({message: "Internal Server Error"})
	}
})


module.exports = router;