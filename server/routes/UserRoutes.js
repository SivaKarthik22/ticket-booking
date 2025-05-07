const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const emailHelper = require('../emailing/emailHelper.js');

const userRouter = express.Router();

userRouter.post('/register', async (req, resp)=>{
    try{
        const existingUserDoc = await UserModel.findOne({email: req.body.email});
        if(existingUserDoc){
            return resp.status(400).send({
                success: false,
                message: "The user already exists!"
            });
        }

        const newUserDoc = new UserModel(req.body);
        await newUserDoc.save();
        
        resp.status(201).send({
            success: true,
            message: "New user created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to register user: ${error.message}`
        });
    }
});

userRouter.post('/login', async (req, resp) => {
    try{
        const userDoc = await UserModel.findOne({email: req.body.email});
        if(!userDoc){
            return resp.status(404).send({
                success: false,
                message: "No such user exists. Please register new user"
            });
        }
        if(userDoc.role != req.body.role){
            return resp.status(400).send({
                success: false,
                message: `Not a valid ${req.body.role}`,
            });
        }

        const authenticate = await bcrypt.compare(req.body.password, userDoc.password); //verify if user entered password is correct

        if(!authenticate){
            return resp.status(401).send({
                success: false,
                message: "Password is incorrect"
            });
        }

        const jwtToken = jwt.sign({userId: userDoc._id}, process.env.JWT_SECRET , {expiresIn: '2d'});

        resp.send({
            success: true,
            message: "Logged in successfully",
            token: jwtToken,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to login user: ${error.message}`
        });
    }
});

userRouter.get("/get-valid-user", authMiddleware, async (req, resp)=>{
    try{
        const userId = req.body.userId;
        const validUserDoc = await UserModel.findById(userId).select('-password');
        resp.send({
            success: true,
            message: "user has been authorized to the page",
            data: validUserDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to authorize user: ${error.message}`
        });
    }
});

userRouter.post("/mail-otp", async (req, resp)=>{
    try{
        if(!req.body.email){
            return resp.status(400).send({
                success: false,
                message: "Email required!"
            });
        }
        
        const userDoc = await UserModel.findOne({email: req.body.email});
        if(!userDoc){
            return resp.status(404).send({
                success: false,
                message: "No such user exists"
            });
        }
        
        userDoc.otp = Math.floor(Math.random() * 10000 + 90000); // otp will be generated in th range of 90000 to 99999
        userDoc.otpExpiry = Date.now() + 10*60*1000; // 10 mins from now
        await userDoc.save();

        await emailHelper('otp.html', req.body.email, {name: userDoc.name, otp: userDoc.otp});

        resp.status(200).send({
            success: true,
            message: "OTP has been sent"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to send otp: ${error.message}`, 
        });
    }
});

module.exports = userRouter;