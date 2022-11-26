const mongoose = require('mongoose');

const Media = (type, sourceURL, caption) => {
    this.type = type;
    this.sourceURL = sourceURL;
    this.caption = caption;
}

// class Section extends mongoose.SchemaType {
//     constructor(key,options) {
//         super(key,options,'Section')
//     }
// }
const Section = (name, date, medias) => {
    this.name = name;
    this.date = date;
    this.medias = medias;
}

const gallerySchema = mongoose.Schema({
    sections: {
        type:Object,
        required:true
    }
});


module.exports = mongoose.model('Gallery',gallerySchema);

// {
//     "sections":[
//         {
//             "name":"Event",
//             "date":"",
//             "media":[
//                 {
//                     "type":"image",
//                     "sourceURL":"url",
//                     "caption":"caption"
//                 },
//                 {
//                     "type":"video",
//                     "sourceURL":"url",
//                     "caption":"caption"
//                 },
//             ]
//         }
//     ]
// }

