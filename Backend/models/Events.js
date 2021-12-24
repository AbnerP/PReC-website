const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {type:String,required:true},
    date:{type:Date,required:false},
    startTime:{type:String,required:true},
    game:{type:String,required:true},
    track:{type:String,required:true},
    duration: {type:String,required:true},
    description: {type:String,required:true},
    imageURL: {type:String,required:true},
    contactInfo:{type:String,required:true}
});

module.exports = mongoose.model('Events',eventSchema);