const jwt = require('jsonwebtoken');

function authMiddleware(req, resp, next){
    try{
        const bearerToken = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.body.userId = verifiedToken.userId;
        next();
    }
    catch(error){
        resp.status(401).send({
            success: false,
            message:"Token is Invalid",
        });
    }
}

module.exports = authMiddleware;