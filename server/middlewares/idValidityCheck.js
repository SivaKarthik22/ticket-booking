function idValidityCheck(req, resp, next){
    const id = req.params.id ? req.params.id : req.body._id;
    if(id.toString().length != 24){
        return resp.status(400).send({
            success: false,
            message: "Invalid id",
        });
    }
    next();
}

module.exports = idValidityCheck;