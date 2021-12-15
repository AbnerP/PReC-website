const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    imageURL: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    teamRole:{
        type:[String],
        required:true
    },
    gamertag:{
        type:String,
        required:true
    },
    kudosPrimeLink:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Drivers',driverSchema);