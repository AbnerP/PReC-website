const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


const app = express();

//Routes
const driversRoute = require('./routes/drivers');
const eventsRoute = require('./routes/events');
const userRoute = require('./routes/user');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/uploads',express.static('uploads'));
app.use('/api/drivers',driversRoute);
app.use('/api/events',eventsRoute);
app.use('/api/user',userRoute);

//DB Connection
mongoose.connect(process.env.DB_CONNECTION,() =>{
    console.log("Connected to DB");
});

//Listening
app.listen(3000,() =>{
    console.log(`Listening on: http://localhost:3000/`);
});