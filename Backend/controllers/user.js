const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            
                        user.save()
                            .then( result =>{
                                console.log(result);
                                res.status(201).json({
                                    message:'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error:err
                                });
                            });
                        
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