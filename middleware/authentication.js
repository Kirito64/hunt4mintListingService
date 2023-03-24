const jwt = require("jsonwebtoken");
const jwtSecret = "agkjaslhdgaelghjwds9ighasdg";

const isAuthenticated = (req, res, next)=>{
	const authHeader = req.headers.authorization;
	if(authHeader){
		const token = authHeader.split(" ")[1];

		jwt.verify(token, jwtSecret, (err, user)=>{
			if(err){
				res.sendStatus(403);
			}
			else{
				req.user = user;
				next();
			}
		})
	}
	else{
		res.sendStatus(401)
	}
}

module.exports = {isAuthenticated}