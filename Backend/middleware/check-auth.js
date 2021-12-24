const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        if(decoded.role === 'admin'){
            req.userData = decoded;
            console.log('ADMIN MIDDLEWARE: IS ADMIN');
            next();
        }else{
            console.log('ADMIN MIDDLEWARE: NOT ADMIN');
            return res.status(401).json({
                message: 'Not admin'
            });
        }
    }catch(error) {
        console.log('ADMIN MIDDLEWARE: ERROR');
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
};