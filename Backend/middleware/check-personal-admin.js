const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        User.findById(req.params.userId)
            .exec()
            .then(usr =>{
                const role = decoded.role 
                if(role === 'admin' || usr._id.toString() === decoded.userId){
                    req.userData = decoded;
                    console.log('PERSONAL-ADMIN MIDDLEWARE: IS ADMIN OR USER');
                    next();
                }else{
                    console.log('ADMIN MIDDLEWARE: NOT ADMIN');
                    return res.status(401).json({
                        message: 'Not admin'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });;
        
    }catch(error) {
        console.log('ADMIN MIDDLEWARE: ERROR');
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
};