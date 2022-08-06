const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailchimp = require("@mailchimp/mailchimp_marketing")
const md5 = require("md5")

exports.getAllUsers = async (req,res,next) =>{
    try{
        const users = await User.find().select(' _id firstName lastName email role');
        const response = {
            users: users.map(user =>{
                return{
                    _id:user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role:user.role,
                };
            }),
            count: users.length
        }
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.getUserByID = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.userId);
        const response = {
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            platforms: user.platforms,
            psnID: user.psnID,
            steamID: user.steamID,
            xboxgamertag: user.xboxgamertag,
            role:user.role,
        }
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message:e});
    } 
};

exports.signup = (req,res,next) =>{
    User.find({email:req.body.email})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(422).json({
                    message: `User with ${req.body.email} already exists`
                });
            }else{
                bcrypt.hash(req.body.password, 10 , (err,hash) =>{
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            email:req.body.email,
                            password:hash,
                            platforms:req.body.platforms,
                            steamID:req.body.steamID,
                            psnID:req.body.psnID,
                            xboxgamertag:req.body.xboxgamertag                        
                        });
                        
                        subscribeToMailingList(req.body.email);
            
                        user.save()
                            .then( result =>{
                                console.log(result);
                                res.status(201).json({
                                    message:'User created'
                                });
                            })
                            // .catch(err => {
                            //     console.log(err);
                            //     res.status(500).json({
                            //         error:err
                            //     });
                            // });
                        
                    }
                });
            }
        })
};

exports.login = (req,res,next) => {
    User.find({email : req.body.email})
        .exec()
        .then(user =>{
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                
                if(result){
                    const token = jwt.sign({
                                userId: user[0]._id,
                                firstName:user[0].firstName,
                                lastName:user[0].lastName,
                                email:user[0].email,
                                platforms:user[0].platforms,
                                steamID:user[0].steamID,
                                psnID:user[0].psnID,
                                xboxgamertag:user[0].xboxgamertag,
                                role:user[0].role,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn:'7d'
                            }
                        );
                    date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                    return res.status(200).json({
                        message: 'Auth succesful',
                        token:token,
                        expiresIn: date
                    });
                }

                return res.status(401).json({
                    message: 'Auth failed'
                });
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};

exports.makeAdmin = async (req,res,next) =>{
    try{
        const updatedUser = await User.updateOne(
            {_id:req.params.userId},
            {$set: {role:'admin'}});
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    }catch(e){
        res.status(400).json({message:'Driver not found'});
    }
}

exports.updateUser = async (req,res,next) =>{
    try{
        User.findById(req.params.userId)
            .exec()
            .then(async (originalUser) => {
                let updateOptions = {};
                console.log(originalUser);
                const obj = Object.entries(originalUser)[2][1];
                for (const [key, value] of Object.entries(obj)) {
                    if(value != req.body[key]){
                        updateOptions[key] = req.body[key];
                    }
                }

                const updatedUser = await User.updateOne(
                    {_id:req.params.userId},
                    {$set: updateOptions}
                );

                console.log(updatedUser);
        
                res.status(200).json(updatedUser);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err,
                    message:'Error ocurred in route.'
                });
            });;;

        

        
    }catch(e){
        res.status(400).json({message:'Driver not updated.'});
    }
}

exports.delete = (req,res,next)=>{
    if(req.userData._id !== req.params.userId){
        User.deleteOne({_id:req.params.userId})
            .exec()
            .then(result =>{
                res.status(200).json({
                    message: "User deleted"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
    }else{
        res.status(400).json({message:'Admin cannot delete himself'});
    }
};

exports.subscribeAllUsers = async (req,res,next) =>{
    const listId = process.env.MAILCHIMP_LIST_ID;
    const mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
    const serverCode = process.env.MAILCHIMP_SERVER_CODE;
    
    
    let users = null;
    try {
        users = await User.find();
        for(user of users){
            console.log(user.email + ": " + user.firstName + " " + user.lastName);
            const response = await subscribeToMailingList(user)
        }
    } catch(e) {
        res.status(400).json({message:e + " Failed querying database for users."});
    }     
    
    res.status(200).send({
        "message":"OK"
    });
};

const subscribeToMailingList  = async (user) => {
    try {
        const listId = process.env.MAILCHIMP_LIST_ID;
        const mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
        const serverCode = process.env.MAILCHIMP_SERVER_CODE;

        mailchimp.setConfig({
            apiKey: mailChimpAPIKey,
            server: serverCode
        });

        const subscriberHash = md5(user.email.toLowerCase());
        await mailchimp.lists.setListMember(
            listId,
            subscriberHash,
            {
                email_address: user.email,
                full_name: user.firstName,
                status_if_new: "subscribed"
            }
        );
    } catch (error) {
        return error;
    }
}