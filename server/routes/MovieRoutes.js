const express = require('express');
const MovieModel = require('../models/MovieModel');
const idValidityCheck = require('../middlewares/idValidityCheck');

const movieRouter = express.Router();

movieRouter.post('/add-movie', async (req, resp)=>{
    try{
        const newMovieDoc = new MovieModel(req.body);
        await newMovieDoc.save();
        resp.status(201).send({
            success: true,
            message: "New movie created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create new movie: ${error.message}`
        });
    }
});

movieRouter.get('/get-all-movies', async (req, resp)=>{
    try{
        const allMovieDocsArray = await MovieModel.find();
        resp.send({
            success: true,
            message: "All movies fetched successfully",
            data: allMovieDocsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch movies: ${error.message}`
        });
    }
});

movieRouter.put('/update-movie', idValidityCheck, async (req, resp)=>{
    try{
        const movieDoc = await MovieModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if(!movieDoc){
            return resp.status(404).send({
                success: false,
                message: "No such movie exists",
            }); //server gets crashed if I don't add this return statement here
        }

        resp.send({
            success: true,
            message: "Movie updated successfully",
            data: movieDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to update movie: ${error.message}`
        });
    }
});

movieRouter.get('/get-movie/:id', idValidityCheck, async (req, resp)=>{
    try{
        const movieDoc = await MovieModel.findById(req.params.id);
        if(!movieDoc){
            return resp.status(404).send({
                success: false,
                message: "No such movie exists",
            });
        }

        resp.send({
            success: true,
            message: "Movie fetched successfully",
            data: movieDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch movie: ${error.message}`
        });
    }
});

movieRouter.delete('/delete-movie/:id', idValidityCheck, async (req, resp)=>{
    try{
        const deletedMovieDoc = await MovieModel.findByIdAndDelete(req.params.id);
        if(!deletedMovieDoc){
            return resp.status(404).send({
                success: false,
                message: "No such movie exists",
            });
        }

        resp.send({
            success: true,
            message: "Movie deleted",
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to delete movie: ${error.message}`
        });
    }
});

module.exports = movieRouter;