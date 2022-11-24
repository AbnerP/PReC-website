const Image = require('../models/Image');
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

exports.getAllIds = async (req,res,next) =>{
    try{
        const images = await Image.find().select(' imageURL');
        const response = {
            images: images.map(image =>{
                return{
                    _id:image._id,
                    imageURL: image.imageURL
                }
            }),
            count: images.length
        }
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.imageCreateNew = async (req,res,next) =>{
    let imageURL; 
    if(req.file == undefined){
        res.status(400).json({message: "No image file found."});
    }

    imageURL = req.file.id.toString();
    
    const image = new Image({
        imageURL: imageURL
    });

    try{
        const savedImage = await image.save();
        res.status(200).json(savedImage);
    }catch(e){
        res.status(400).json({message:"Error saving image metadata to database."});
    } 
};

exports.imageDelete = async (req,res,next) =>{
    try{
        const image = await Image.findById(req.params.imageId);
        if(image){
            try{
                console.log("Attempting to delete image with ID: "+image.imageURL);
                deleteImage(image._id);
            }catch(err){
                res.status(400).json({message:`Unable to delete Image with ID ${image.name}`});
            }
        }else{ 
            res.status(404).json({message:`No image with id:${req.params.imageId}`});
        }
        const removedImage = await Image.deleteOne({_id:image._id});
        res.status(200).json(removedImage);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

const deleteImage = (id) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
    //   if (err) return res.status(500).send('image deletion error');
    });
  };