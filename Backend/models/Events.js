const mongoose = require('mongoose');
const User = require('../models/User');

const eventSchema = mongoose.Schema({
    name: {type:String,required:true},
    date:{type:Date,required:false},
    startTime:{type:String,required:true},
    host:{type:String},
    platform:{type:String,required:true},
    game:{type:String,required:true},
    track:{type:String,required:true},
    duration: {type:String,required:true},
    description: {type:String,required:true},
    imageURL: {type:String,required:true},
    contactInfo:{type:String,required:true},
    registrationLimit:{type:Number,required:true},
    numberRegisteredUsers:{type:Number, default:0},
    registeredUserIDsList:{type:[String],default:[]},
});

module.exports = mongoose.model('Events',eventSchema);