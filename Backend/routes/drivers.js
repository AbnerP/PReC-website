const express = require('express');
const router = express.Router();
const Driver = require('../models/Drivers');

router.get('/',async (req,res) =>{
    try{
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.get('/:driverId',async (req,res) =>{
    try{
        const driver = await Driver.findById(req.params.driverId);
        res.status(200).json(driver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.post('/',async (req,res) =>{
    const driver = new Driver({
        imageURL: req.body.imageURL,
        name: req.body.name,
        teamRole: req.body.teamRole,
        gamertag: req.body.gamertag,
        kudosPrimeLink:req.body.kudosPrimeLink 
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
        const updatedDriver = await Driver.updateOne(
            {_id:req.params.driverId},
            {$set:{imageURL:req.body.imageURL}}
            );
        res.status(200).json(updatedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});

router.delete('/:driverId',async (req,res) =>{
    try{
        const removedDriver = await Driver.remove({_id:req.params.driverId});
        res.status(200).json(removedDriver);
    }catch(e){
        res.status(400).json({message:e});
    } 
});


module.exports = router;