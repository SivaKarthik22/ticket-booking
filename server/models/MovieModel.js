const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    poster:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    language:{
        type: String,
        required: true,
    },
    releaseDate:{
        type: Date,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});

const MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;