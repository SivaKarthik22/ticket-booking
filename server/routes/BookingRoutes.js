const express = require('express');
const BookingModel = require('../models/BookingModel');
const ShowModel = require('../models/ShowModel');
const authMiddleware = require('../middlewares/authMiddleware');
const stripe = require('stripe')("sk_test_51RCO1oRuKC394fyCUSPD5rFckXYFQRFP0SkycPGIxq46XrDAVXhr01DgYshzvAipYKjCjdlj8lznJm68oSyhDcUz00PEA8RBxP");

const bookingRouter = express.Router();

bookingRouter.post('/create-payment-intent', async (req, resp)=>{
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            currency:'inr',
            amount: req.body.amount*100,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        resp.send({
            success: true,
            message: 'Payment Intent created',
            data: {
                paymentId: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
            },
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to create payment intent: ${error.message}`
        });
    }
});

bookingRouter.post('/book-show', async (req, resp)=>{
    try{
        const newBookingDoc = new BookingModel(req.body);
        await newBookingDoc.save();

        const showDoc = await ShowModel.findById(req.body.show);
        const updatedBookedSeats = [...showDoc.bookedSeats, ...newBookingDoc.seats];
        await ShowModel.findByIdAndUpdate(req.body.show, {bookedSeats: updatedBookedSeats});
        
        resp.status(201).send({
            success: true,
            message: 'Tickets booked successfully',
            data: newBookingDoc._id,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to book tickets: ${error.message}`
        });
    }
});

bookingRouter.get('/get-all-bookings', authMiddleware, async (req, resp)=>{
    try{
        const allBookingsArray = await BookingModel.find({user: req.body.userId})
            .populate('show')
            .populate({
                path:'show',
                populate: {
                    path:'movie',
                    model: 'movie',
                }
            })
            .populate({
                path:'show',
                populate: {
                    path:'theatre',
                    model: 'theatre',
                }
            });
            
        resp.status(200).send({
            success: true,
            message: 'All bookings fetched successfully',
            data: allBookingsArray,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch all bookings: ${error.message}`
        });
    }
});

bookingRouter.get('/get-booking/:bookingId', authMiddleware, async (req, resp)=>{
    try{
        const bookingDoc = await BookingModel.findOne({user: req.body.userId, _id: req.params.bookingId})
            .populate('show')
            .populate({
                path:'show',
                populate: {
                    path:'movie',
                    model: 'movie',
                }
            })
            .populate({
                path:'show',
                populate: {
                    path:'theatre',
                    model: 'theatre',
                }
            });
        
        if(!bookingDoc){
            resp.status(400).send({
                success: false,
                message: 'No such booking exists',
            });
        }
            
        resp.status(200).send({
            success: true,
            message: 'Booking fetched successfully',
            data: bookingDoc,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to fetch the booking: ${error.message}`
        });
    }
});

module.exports = bookingRouter;