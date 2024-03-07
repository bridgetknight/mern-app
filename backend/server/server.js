const express = require("express");
const app = express();
const cors = require('cors')
const dbConnection = require('./config/db.config')

// routes for User model
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')

// routes for Route model
const getAllRoutes = require("./routes/routeGetAll")
const deleteAllRoutes = require("./routes/routeDeleteAll.js")
const getRouteById = require("./routes/routeGetById.js")
const saveRoute = require("./routes/routeSaveRoute.js")
const editRoute = require("./routes/routeEditRoute.js")

// routes for Location model
const saveLocation = require("./routes/locationSaveLocation.js")

// Middleware
require('dotenv').config();
const SERVER_PORT = 8081

// Establish database connection
dbConnection()

/* * * * * * *  Mounting Routes * * * * * * * */
app.use(cors({origin: '*'}))
app.use(express.json())

// User model
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)

// Route model
app.use("/route", getAllRoutes)
app.use("/route", saveRoute)
app.use("/route", getRouteById)
app.use("/route", editRoute)
app.use("/route", deleteAllRoutes)

// Location model
app.use("/location", saveLocation)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
