const jwt = require('jsonwebtoken');


module.exports.verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['token'];
    if(!token){
        res.status(400).json({err: 'token required'}); 
    }
    try{
        const decode = jwt.verify(token, 'secret');
        req.data = decode;
    }catch(err){
        res.status(401).json({err : 'invalid token'});
    }
    next();
}