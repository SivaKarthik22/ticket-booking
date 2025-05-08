const express = require('express');
const BookingModel = require('../models/BookingModel');
const ShowModel = require('../models/ShowModel');
const authMiddleware = require('../middlewares/authMiddleware');
const idValidityCheck = require('../middlewares/idValidityCheck');
const emailHelper = require('../emailing/emailHelper');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const moment = require('moment');

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

        const populatedBookingInfo = await BookingModel.findById(newBookingDoc._id)
            .populate({
                path: 'user',
                select: '-password',
            })
            .populate('show')
            .populate({
                path: 'show',
                populate: {
                    path: 'movie',
                    model: 'movie',
                }
            })
            .populate({
                path: 'show',
                populate: {
                    path: 'theatre',
                    model: 'theatre',
                }
            });

        await emailHelper('ticketTemplate.html', populatedBookingInfo.user.email, {
            name: populatedBookingInfo.user.name,
            movie: populatedBookingInfo.show.movie.title,
            theatre: populatedBookingInfo.show.theatre.name,
            date: moment(populatedBookingInfo.show.date).format("DD-MMM-YYYY"),
            time: moment(populatedBookingInfo.show.time, "HH:mm").format("hh:mm A"),
            seats: populatedBookingInfo.seats,
            amount: populatedBookingInfo.seats.length * populatedBookingInfo.show.ticketPrice,
            transactionId: populatedBookingInfo.transactionId,
        });
        
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

bookingRouter.get('/get-booking/:id', [authMiddleware, idValidityCheck], async (req, resp)=>{
    try{
        const bookingDoc = await BookingModel.findOne({user: req.body.userId, _id: req.params.id})
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
            return resp.status(400).send({
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