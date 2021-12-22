const express = require('express');
const app = express();
var morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const driversRoute = require('./routes/drivers');
const eventsRoute = require('./routes/events');
const userRoute = require('./routes/user');

//DB Connection
mongoose.connect(process.env.DB_CONNECTION,() =>{
    console.log("Connected to DB");
});

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/uploads',express.static('uploads'));
app.use('/api/drivers',driversRoute);
app.use('/api/events',eventsRoute);
app.use('/api/user',userRoute);


//Listening
app.listen(3000,() =>{
    console.log(`Listening on: http://localhost:3000/`);
});