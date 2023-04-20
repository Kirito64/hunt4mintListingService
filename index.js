require("dotenv").config()
const express = require('express')
const app = express()
const port = 3001
const db = require("./config/db")
const swaggerUI = require("swagger-ui-express")
const swaggerFile = require("./swagger.json")
db.Sequelize.sync()


//middlewares
const {isAuthenticated} = require("./middleware/authentication")

app.use(express.json())
app.use(express.urlencoded())

app.get('/', isAuthenticated, (req, res) => res.send('Hello World!'))
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile))
const ListingRoutes = require("./routes/listingRoutes")
app.use("/", isAuthenticated, ListingRoutes)

app.listen(port, () => console.log(`Listing Service listening on port ${port}!`))