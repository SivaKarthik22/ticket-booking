const jwt = require('jsonwebtoken');

function authMiddleware(req, resp, next){
    try{
        const bearerToken = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(bearerToken, 'this_is_my_show');
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