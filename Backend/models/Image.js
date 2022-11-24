const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    imageURL: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Image',imageSchema);