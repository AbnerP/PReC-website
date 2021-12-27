const Driver = require('../models/Drivers');
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

exports.driversGetAll = async (req,res,next) =>{
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
};

exports.driversGetByID = async (req,res,next) =>{
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
};

exports.driversCreateNew = async (req,res,next) =>{
    let imageURL; 
    if(req.file == undefined){
        imageURL = "uploads/defaultDriverIMG.jpeg";
    }else{
        imageURL = req.file.id.toString();
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
};

exports.driversUpdate = async (req,res,next) =>{
    try{
        const originalDriver = await Driver.findById({_id:req.params.driverId});

        let updateOptions = {};
        const obj = Object.entries(originalDriver)[2][1];
        for (const [key, value] of Object.entries(obj)) {
            if(value != req.body[key]){
                updateOptions[key] = req.body[key];
            }
        }

        if(req.file != undefined){
            updateOptions["imageURL"] = req.file.id.toString();
            deleteImage(originalDriver.imageURL);
        }

        const updatedDriver = await Driver.updateOne(
            {_id:req.params.driverId},
            {$set: updateOptions}
        );

        res.status(200).json(updatedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.driversDelete = async (req,res,next) =>{
    try{
        const driver = await Driver.findById(req.params.driverId);
        if(driver){
            if(driver.imageURL != "uploads/defaultDriverIMG.jpeg"){
                try{
                    console.log(driver.imageURL);
                    deleteImage(driver.imageURL);
                }catch(err){
                    res.status(400).json({message:`Unable to delete Image with ID ${driver.name}`});
                }
            }
        }else{
            res.status(404).json({message:`No driver with id:${req.params.driverId}`});
        }
        const removedDriver = await Driver.deleteOne({_id:req.params.driverId});
        res.status(200).json(removedDriver);
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