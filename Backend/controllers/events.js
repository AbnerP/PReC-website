const Event = require('../models/Events');
const unlinkAsync = require('../middleware/imageDelete');

exports.eventsGetAll = async (req,res,next) =>{
    try{
        const events = req.query.limit === undefined ? await Event.find() : await Event.find().limit(parseInt(req.query.limit));
        const response = {
            events: events.map(event =>{
                return{
                    _id:event._id,
                    name: event.name,
                    date: event.date,
                    startTime: event.startTime,
                    game:event.game,
                    track: event.track,
                    duration: event.duration,
                    description: event.description,
                    imageURL: event.imageURL,
                    contactInfo:event.contactInfo
                }
            }),
            count: events.length
        }
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.eventsGetByID = async (req,res,next) =>{
    try{
        const event = await Event.findById(req.params.eventId);
        if(event){
            res.status(200).json(event);
        }else{
            res.status(404).json({message:`No event with id:${req.params.eventId}`});
        }
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.eventsCreate = async (req,res,next) =>{
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.startTime,
        game:req.body.game,
        track:req.body.track, 
        duration:req.body.duration, 
        description:req.body.description, 
        contactInfo:req.body.contactInfo,
        imageURL:req.file.path,
        host:req.body.host,
        registrationLimit:req.body.registrationLimit,
        platform:req.body.platform,
    });

    try{
        const savedEvent = await event.save();
        res.status(200).json(savedEvent);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.eventsUpdate = async (req,res,next) =>{
    try{
        const originalEvent = await Event.findById({_id:req.params.eventId});
        
        let updateOptions = {};
        const obj = Object.entries(originalEvent)[2][1];
        for (const [key, value] of Object.entries(obj)) {
            if(value != req.body[key]){
                updateOptions[key] = req.body[key];
            }
        }

        if(req.file != undefined){
            updateOptions["imageURL"] = req.file.path;
            await unlinkAsync(originalEvent.imageURL);
        }

        const updatedEvent = await Event.updateOne(
            {_id:req.params.eventId},
            {$set: updateOptions}
        );

        res.status(200).json(updatedEvent);

    }catch(e){
        console.log('Unable to get original event');
    } 
};

exports.eventsDelete =  async (req,res,next) =>{
    try{
        const event = await Event.findById(req.params.eventId);
        if(event){
            await unlinkAsync(event.imageURL);
        }else{
            res.status(404).json({message:`No event with id:${req.params.eventId}`});
        }
        const removedEvent = await Event.remove({_id:req.params.eventId});
        res.status(200).json(removedEvent);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

