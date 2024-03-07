const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllRoutes = require("./routes/routeGetAll")
const saveLocation = require("./routes/locationSaveLocation.js")

// Middleware
require('dotenv').config();
const SERVER_PORT = 8081

// Establish database connection
dbConnection()

// Routes
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use("/route", getAllRoutes)
app.use("/location", saveLocation)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
