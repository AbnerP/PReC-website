const express = require('express');
const app = express();
var morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const port = process.env.PORT | 3000;

const driversRoute = require('./routes/drivers');
const eventsRoute = require('./routes/events');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/uploads',express.static('uploads'));
app.use('/api/drivers',driversRoute);
app.use('/api/events',eventsRoute);
app.use('/api/user',userRoute);
app.use('/api/images',imageRoute);


//Listening
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    app.listen(port,() =>{
        console.log(`Listening on: http://localhost:${port}/`);
    });
  });

module.exports = app;