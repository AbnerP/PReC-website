const Event = require('../models/Events');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_CONNECTION;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});

exports.eventsGetAll = async (req,res,next) =>{
    try{
        const events = req.query.limit === undefined ? await Event.find() : await Event.find().limit(parseInt(req.query.limit));
        const response = {
            events: events,
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

exports.getRegisteredUserIDs = async (req,res,next) =>{
    try{
        Event.findById(req.params.eventId)
            .exec()
            .then(event =>{
                const response = {
                    ids:event.registeredUserIDsList,
                    count: event.registeredUserIDsList.length
                }
                res.status(200).json(response);
            });
    }catch(e){
        res.status(404).json({message:e});
    } 
};

exports.registerUserToEvent = async (req,res,next) =>{
    try{
        Event.findById({_id:req.query.eventId})
            .exec()
            .then(async (originalEvent) =>{
                if(originalEvent.registeredUserIDsList.includes(req.userData.userId)){
                    res.status(404).json({message:'Already registered to event'})
                }else{
                    const updatedEvent = await Event.updateOne(
                        {_id:req.query.eventId},
                        {$inc : {numberRegisteredUsers : 1}
                        ,$push : {registeredUserIDsList: req.userData.userId}}
                    );
                    res.status(200).json(updatedEvent);
                }
            });
    }catch(e){
        res.status(400).json({message:e});
    }         
};

exports.withdrawUserFromEvent = async (req,res,next) =>{
    try{
        Event.findById({_id:req.query.eventId})
            .exec()
            .then(async (originalEvent) =>{
                if(originalEvent.registeredUserIDsList.includes(req.userData.userId)){
                    const updatedEvent = await Event.updateOne(
                        {_id:req.query.eventId},
                        {$inc : {numberRegisteredUsers : -1}
                        ,$pull : {registeredUserIDsList: req.userData.userId}}
                    );
                    res.status(200).json(updatedEvent);
                }else{
                    res.status(404).json({message:'Not registered to event'})
                }
            });
    }catch(e){
        res.status(400).json({message:e});
    }        
};

exports.eventsCreate = async (req,res,next) =>{
    const imgId = req.file.id.toString();
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.startTime,
        game:req.body.game,
        track:req.body.track, 
        duration:req.body.duration, 
        description:req.body.description, 
        contactInfo:req.body.contactInfo,
        imageURL:imgId,
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
            updateOptions["imageURL"] = req.file.id.toString();
            deleteImage(originalEvent.imageURL);
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
            try{
                console.log(event.imageURL);
                deleteImage(event.imageURL);
            }catch(err){
                res.status(400).json({message:`Unable to delete Image with ID ${event.name}`});
            }
        }else{
            res.status(404).json({message:`No event with id:${req.params.eventId}`});
        }
        const removedEvent = await Event.remove({_id:req.params.eventId});
        res.status(200).json(removedEvent);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

const deleteImage = (id) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
      if (err) return res.status(500).send('image deletion error');
    });
  };