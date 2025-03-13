const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]; // get the token from the request headers

    if(!token){
        return res.status(401).json({message: 'Access denied.No token provided'});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(e){
        return res.status(403).json({message:'Invalid or expired token'});
    }
};

module.exports = verifyToken;