const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    teamRole:{
        type:[String],
        required:true,
        default:["Driver"]
    },
    gamertag:{
        type:String,
        required:true
    },
    kudosPrimeLink:{
        type:String,
        required:false
    },
    imageURL: {
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Drivers',driverSchema);