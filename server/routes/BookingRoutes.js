const express = require('express');
const BookingModel = require('../models/BookingModel');
const ShowModel = require('../models/ShowModel');
const authMiddleware = require('../middlewares/authMiddleware');
const stripe = require('stripe')("sk_test_51RCO1oRuKC394fyCUSPD5rFckXYFQRFP0SkycPGIxq46XrDAVXhr01DgYshzvAipYKjCjdlj8lznJm68oSyhDcUz00PEA8RBxP");

const bookingRouter = express.Router();

bookingRouter.post('/make-payment', async (req, resp)=>{
    try{
        const {token, amount} = req.body;
        
        //create customer
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        //create payment intent to verify the payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            customer: customer.id,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to movie",
        });

        const transactionId = paymentIntent.id;

        resp.status(201).send({
            success: true,
            message: 'Payment Successful',
            data: transactionId,
        });
    }
    catch(error){
        resp.status(500).send({
            success: false,
            message: `Failed to make payment: ${error.message}`
        });
    }
});

bookingRouter.post('/book-show', async (req, resp)=>{
    try{
        const newBookingDoc = new BookingModel(req.body);
        await newBookingDoc.save();

        const showDoc = await ShowModel.findById(req.body.show);
        const updatedBookedSeats = [...showDoc.bookedSeats, newBookingDoc.seats];
        await ShowModel.findByIdAndUpdate(req.body.show, {bookedSeats: updatedBookedSeats});
        
        resp.status(201).send({
            success: true,
            message: 'Tickets booked successfully',
            data: newBookingDoc,
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

module.exports = bookingRouter;