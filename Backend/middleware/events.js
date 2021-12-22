const Event = require('../models/Events');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

let removeOldEvents = async (req, res, next) => {
    const events = await Event.find();
    if(events.length > 0){
        let now = new Date('2021-12-26T04:00:00.00');
        now.setHours(0,0,0,0);
        events.forEach( async event => {
            // console.log(event.date);
            if(event.date < now){
                // console.log(now);
                await Event.deleteOne({_id:event._id});
                await unlinkAsync(event.imageURL);
            }
        });
    }
    next();
};

module.exports = removeOldEvents;