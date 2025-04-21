const express = require('express');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/UserRoutes');
const movieRouter = require('./routes/MovieRoutes');
const theatreRouter = require('./routes/TheatreRoutes');
const showRouter = require('./routes/ShowRoutes');
const bookingRouter = require('./routes/BookingRoutes');
const path = require('path');

const app = express();

connectDB();

const clientBuildPath = path.join(__dirname, "../client/dist"); // ticket booking/client/dist
app.use(express.static(clientBuildPath));
/* app.get('*', (req, resp)=>{
    resp.sendFile(path.join(clientBuildPath, "index.html"));
}); */

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});