const express = require('express');
const TheatreModel = require('../models/TheatreModel');

const theatreRouter = express.Router();

theatreRouter.post('/add-theatre', async (req, resp)=>{
    try{
        const newTheatreDoc = new TheatreModel(req.body);
        await newTheatreDoc.save();
        resp.status(201).send({
            success: true,
            message: "New theatre created successfully"
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create new theatre: ${error.message}`
        });
    }
});

theatreRouter.put('/update-theatre', async (req, resp)=>{
    try{
        if(req.body._id.toString().length != 24){
            return resp.status(400).send({
                success: false,
                message: "Invalid id",
            });
        }

        const theatreDoc = await TheatreModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if(!theatreDoc){
            return resp.status(404).send({
                success: false,
                message: "No such theatre exists",
            });
        }

        resp.send({
            success: true,
            message: "Theatre updated successfully",
            data: theatreDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to update theatre: ${error.message}`
        });
    }
});

theatreRouter.delete('/delete-theatre/:id', async (req, resp)=>{
    try{
        if(req.params.id.toString().length != 24){
            return resp.status(400).send({
                success: false,
                message: "Invalid id",
            });
        }

        const deletedTheatreDoc = await TheatreModel.findByIdAndDelete(req.params.id);
        if(!deletedTheatreDoc){
            return resp.status(404).send({
                success: false,
                message: "No such theatre exists",
            });
        }

        resp.send({
            success: true,
            message: "Theatre deleted",
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to delete theatre: ${error.message}`,
        });
    }
});

theatreRouter.get('/get-theatres-by-owner/:ownerId', async (req, resp)=>{
    try{
        if(req.params.ownerId.toString().length != 24){
            return resp.status(400).send({
                success: false,
                message: "Invalid owner id",
            });
        }
        
        const theatreDocArray = await TheatreModel.find({owner: req.params.ownerId});
        if(!theatreDocArray){
            return resp.status(404).send({
                success: false,
                message: "No such owner exists",
            });
        }

        resp.send({
            success: true,
            message: "All Theatres fetched successfully",
            data: theatreDocArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch theatres: ${error.message}`
        });
    }
});

theatreRouter.get('/get-all-theatres', async (req, resp)=>{
    try{
        const allTheatreDocsArray = await TheatreModel.find().populate({
            path: 'owner',
            select: '-password',
        });
        resp.send({
            success: true,
            message: "All theatres fetched successfully",
            data: allTheatreDocsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch theatres: ${error.message}`
        });
    }
});


module.exports = theatreRouter;