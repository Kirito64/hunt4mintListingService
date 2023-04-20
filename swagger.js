const swaggerAutogen = require("swagger-autogen")()
const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/listingRoutes.js"]

swaggerAutogen(outputFile, endpointsFiles)