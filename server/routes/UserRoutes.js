const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const userRouter = express.Router();

userRouter.post('/register', async (req, resp)=>{
    try{
        const existingUserDoc = await UserModel.findOne({email: req.body.email});
        if(existingUserDoc){
            resp.status(400).send({
                success: false,
                message: "The user already exists!"
            });
        }

        const newUserDoc = new UserModel(req.body);
        const salt = await bcrypt.genSalt(10); //generates a new salt 
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); //adds the salt to the password and hashes it
        newUserDoc.password = hashedPassword;
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
            resp.status(404).send({
                success: false,
                message: "No such user exists. Please register new user"
            });
        }

        const authenticate = await bcrypt.compare(req.body.password, userDoc.password); //verify if user entered password is correct

        if(!authenticate){
            resp.status(401).send({
                success: false,
                message: "Password is incorrect"
            });
        }

        const jwtToken = jwt.sign({userId: userDoc._id}, 'this_is_my_show', {expiresIn: '2d'});

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

module.exports = userRouter;