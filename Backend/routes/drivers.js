const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const { promisify } = require('util');
const router = express.Router();
const Driver = require('../models/Drivers');

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
        const drivers = await Driver.find().select(' name teamRole gamertag kudosPrimeLink imageURL');
        const response = {
            drivers: drivers.map(driver =>{
                return{
                    _id:driver._id,
                    name: driver.name,
                    teamRole: driver.teamRole,
                    gamertag: driver.gamertag,
                    kudosPrimeLink:driver.kudosPrimeLink,
                    imageURL: driver.imageURL
                }
            }),
            count: drivers.length
        }
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.get('/:driverId',async (req,res) =>{
    try{
        const driver = await Driver.findById(req.params.driverId);
        if(driver){
            res.status(200).json(driver);
        }else{
            res.status(404).json({message:`No driver with id:${req.params.driverId}`});
        }
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.post('/',upload.single('driverImage'),async (req,res) =>{
    
    console.log(req);
    let imageURL; 
    if(req.file == undefined){
        imageURL = "uploads/defaultDriverIMG.jpeg";
    }else{
        imageURL = req.file.path;
    }
    const driver = new Driver({
        name: req.body.name,
        teamRole: req.body.teamRole,
        gamertag: req.body.gamertag,
        kudosPrimeLink:req.body.kudosPrimeLink,
        imageURL: imageURL
    });

    try{
        const savedDriver = await driver.save();
        res.status(200).json(savedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.patch('/:driverId',async (req,res) =>{
    try{
        const updateOptions = {};
        for(const option of req.body){
            updateOptions[option.propName] = option.value;
        }

        const updatedDriver = await Driver.updateOne(
            {_id:req.params.driverId},
            {$set: updateOptions}
        );

        res.status(200).json(updatedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.delete('/:driverId',async (req,res) =>{
    try{
        const driver = await Driver.findById(req.params.driverId);
        if(driver){
            if(driver.imageURL != "uploads/defaultDriverIMG.jpeg"){
                await unlinkAsync(driver.imageURL);
            }
        }else{
            res.status(404).json({message:`No driver with id:${req.params.driverId}`});
        }
        const removedDriver = await Driver.remove({_id:req.params.driverId});
        res.status(200).json(removedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});


module.exports = router;