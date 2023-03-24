const router = require('express').Router();
const db = require("../config/db");

router.get("/getAllAuditions" , async (req, res)=>{

	try{
		const auditions = await db.listing.findAll({where:{
			typeOfListing: "audition",
		}})
		res.status(200).send(auditions)
	}
	catch(err){
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.post("/newAudition", async (req, res) => {

	let data  = req.body;
	try{
		data.typeOfListing = "audition";
		const newAudition = await db.listing.create(data);
		res.status(200).send({message: "Audition Created", data: newAudition});
	}
	catch(err){
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
		res.status(500).send({message: "Internal Server Error"})
	}
})

router.post("/newProject", async (req, res) => {

	let data  = req.body;
	const user = req.user.id;
	data.createdBy = user;
	try{
		data.typeOfListing = "project";
		const newAudition = await db.listing.create(data);
		res.status(200).send({message: "Project Created", data: newAudition});
	}
	catch(err){
		res.status(500).send({message: "Error in createing a new audition", err})
	}
})




router.post("/applyToListing", async (req, res) => {
	const listingId = req.body.listingId;
	const applicantId = req.body.applicantId;
	try{
		let data = {};
		data.listingId = listingId;
		data.applicantId = applicantId;

		const newApplication = await db.applicant.create(data);
		res.status(200).send({message: "Succesfully Appplied to listing", data: newApplication})

	}
	catch(err){
		res.status(500).send({message: "Unexpected error occured while Applying", data: err.data})
	}
})


module.exports = router;