const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ['admin', 'partner', 'customer'],
        default: 'customer',
    }
});

//pre-save hook for hashing password before saving
userSchema.pre('save', async function (next){
    const userDoc = this;

    //check if password in document was modified since the last save or retrieval
    if(!userDoc.isModified('password'))
        return next();

    try{
        const salt = await bcrypt.genSalt(10); //generates a new salt 
        const hashedPassword = await bcrypt.hash(userDoc.password, salt); //adds the salt to the password and hashes it
        userDoc.password = hashedPassword;
        next();
    }
    catch(error){
        next(error);
    }  
});

//create model
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
