const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/UserModel.js');

userRouter.post('/register', async (req, resp)=>{
    try{
        const userExists = await UserModel.findOne({email: req.body.email});
        if(userExists){
            resp.send({
                success: false,
                message: "the user already exists!"
            });
        }

        const newUser = new UserModel(req.body);
        await newUser.save();
        resp.send({
            success: true,
            message: "new user created successfully"
        });
    }
    catch(error){
        console.log(error);
    }
});

module.exports = userRouter;