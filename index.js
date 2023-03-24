const express = require('express')
const app = express()
const port = 3001
const db = require("./config/db")
db.Sequelize.sync()


//middlewares
const {isAuthenticated} = require("./middleware/authentication")

app.use(express.json())
app.use(express.urlencoded())

app.get('/', isAuthenticated, (req, res) => res.send('Hello World!'))

const ListingRoutes = require("./routes/listingRoutes")
app.use("/", isAuthenticated, ListingRoutes)

app.listen(port, () => console.log(`Listing Service listening on port ${port}!`))