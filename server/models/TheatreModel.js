const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: false,
    },
},
{timestamps: true});

const TheatreModel = mongoose.model('theatre', theatreSchema);

module.exports = TheatreModel;