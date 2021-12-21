const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const { promisify } = require('util');
const router = express.Router();
const Event = require('../models/Events');

//Image Uploading
const unlinkAsync = promisify(fs.unlink);
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,null);
    }
};
const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

router.get('/',async (req,res) =>{
    try{
        const events = await Event.find()
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
});

router.get('/:eventId',async (req,res) =>{
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
});

router.post('/',upload.single('eventImage'),async (req,res) =>{
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        startTime: req.body.startTime,
        game:req.body.game,
        track:req.body.track, 
        duration:req.body.duration, 
        description:req.body.description, 
        contactInfo:req.body.contactInfo,
        imageURL:req.file.path
    });

    try{
        const savedEvent = await event.save();
        res.status(200).json(savedEvent);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.patch('/:eventId',async (req,res) =>{
    try{
        const updateOptions = {};
        for(const option of req.body){
            updateOptions[option.propName] = option.value;
        }

        const updatedEvent = await Event.updateOne(
            {_id:req.params.eventId},
            {$set: updateOptions}
        );

        res.status(200).json(updatedEvent);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.delete('/:eventId',async (req,res) =>{
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
});


module.exports = router;