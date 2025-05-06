require('dotenv').config(); //loads env variables into process.env

const express = require('express');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/UserRoutes');
const movieRouter = require('./routes/MovieRoutes');
const theatreRouter = require('./routes/TheatreRoutes');
const showRouter = require('./routes/ShowRoutes');
const bookingRouter = require('./routes/BookingRoutes');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

connectDB();

const clientBuildPath = path.join(__dirname, "../client/dist"); // ticket booking/client/dist
app.use(express.static(clientBuildPath));

const limiter = rateLimit({
    windowMs: 15*60*1000, //15 mins
    max: 100, //each IP can make upto 100 requests
    message: "Too many requests received from this IP. Please try again after some time",
});
app.use('/api/', limiter);

app.use(mongoSanitize()); //saves from sql injection attacks

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});