const express = require('express');
const ShowModel = require('../models/ShowModel');
const idValidityCheck = require('../middlewares/idValidityCheck');

const showRouter = express.Router();

showRouter.post('/add-show', async (req, resp)=>{
    try{
        const showDoc = new ShowModel(req.body);
        await showDoc.save();
        resp.status(201).send({
            success: true,
            message: "New show created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create new show: ${error.message}`
        });
    }
});

showRouter.put('/update-show', idValidityCheck, async (req, resp)=>{
    try{
        const showDoc = await ShowModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if(!showDoc){
            return resp.status(404).send({
                success: false,
                message: "No such show exists",
            });
        }

        resp.send({
            success: true,
            message: "Show updated successfully",
            data: showDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to update show: ${error.message}`,
        });
    }
});

showRouter.delete('/delete-show/:id', idValidityCheck , async (req, resp)=>{
    try{
        const deletedShowDoc = await ShowModel.findByIdAndDelete(req.params.id);
        if(!deletedShowDoc){
            return resp.status(404).send({
                success: false,
                message: "No such show exists",
            });
        }

        resp.send({
            success: true,
            message: "Show deleted",
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to delete show: ${error.message}`
        });
    }
});

showRouter.get('/get-shows-by-theatre/:id', idValidityCheck, async (req, resp)=>{
    try{
        const showsDocArray = await ShowModel.find({theatre: req.params.id}).populate('movie');
        if(!showsDocArray){
            return resp.status(404).send({
                success: false,
                message: "No such theatre exists",
            });
        }

        resp.send({
            success: true,
            message: "All Shows fetched successfully",
            data: showsDocArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch shows: ${error.message}`
        });
    }
});

showRouter.get('/get-show/:id', idValidityCheck, async (req, resp)=>{
    try{
        const showDoc = await ShowModel.findById(req.params.id).populate('movie').populate('theatre');
        if(!showDoc){
            return resp.status(404).send({
                success: false,
                message: "No such show exists",
            });
        }

        resp.send({
            success: true,
            message: "Show fetched successfully",
            data: showDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch show: ${error.message}`
        });
    }
});

showRouter.put('/get-theatre-shows-of-movie', async (req, resp)=>{
    try{
        const {movie, date} = req.body;
        const showsDocsArray = await ShowModel.find({movie, date}).populate('theatre');

        //structure the array with unique theatres and their shows inside them
        const theatresMap = new Map();
        showsDocsArray.forEach(showDoc => {
            const theatreId = showDoc.theatre._id;
            if(theatresMap.has(theatreId))
                theatresMap.set(theatreId, {...showDoc.theatre._doc, shows: [...theatresMap.get(theatreId).shows, showDoc] } );
            else
                theatresMap.set(theatreId, {...showDoc.theatre._doc, shows: [showDoc]} );
        });
        
        const theatresArray = Array.from(theatresMap.values());

        resp.send({
            success: true,
            message: "All Theatres and Shows fetched successfully",
            data: theatresArray,
        });
        
    }catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch shows: ${error.message}`
        });
    }
});

module.exports = showRouter;