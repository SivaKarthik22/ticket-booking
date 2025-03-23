const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

userRouter.post('/register', async (req, resp)=>{
    try{
        const userExists = await UserModel.findOne({email: req.body.email});
        if(userExists){
            resp.status(400).send({
                success: false,
                message: "The user already exists!"
            });
        }

        const newUser = new UserModel(req.body);
        const salt = await bcrypt.genSalt(10); //generates a new salt 
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); //adds the salt to the password and hashes it
        newUser.password = hashedPassword;
        await newUser.save();
        
        resp.send({
            success: true,
            message: "New user created successfully"
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
        console.error(error);
    }
});

userRouter.get("/get-valid-user", authMiddleware, async (req, resp)=>{
    const userId = req.body.userId;
    const validUserDoc = await UserModel.findById(userId).select('-password');
    resp.send({
        success: true,
        message: "user has been authorized to the page",
        data: validUserDoc,
    });
});

module.exports = userRouter;