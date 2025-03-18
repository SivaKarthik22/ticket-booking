const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const UserModel = require('../models/UserModel.js');

userRouter.post('/register', async (req, resp)=>{
    try{
        const userExists = await UserModel.findOne({email: req.body.email});
        if(userExists){
            resp.status(400).send({
                success: false,
                message: "the user already exists!"
            });
        }

        const newUser = new UserModel(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        newUser.password = hashedPassword;
        await newUser.save();
        
        resp.send({
            success: true,
            message: "new user created successfully"
        });
    }
    catch(error){
        console.error(error);
    }
});

userRouter.post('/login', async (req, resp) => {
    try{
        const userDoc = await UserModel.findOne({email: req.body.email});
        if(!userDoc){
            resp.status(400).send({
                success: false,
                message: "no such user exists. Please register new user"
            });
        }

        const authenticate = await bcrypt.compare(req.body.password, userDoc.password);

        if(!authenticate){
            resp.status(401).send({
                success: false,
                message: "password is incorrect"
            });
        }
        resp.send({
            success: true,
            message: "logged in successfully"
        });
    }
    catch(error){
        console.error(error);
    }
});

module.exports = userRouter;