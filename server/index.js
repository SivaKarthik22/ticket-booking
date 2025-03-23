const express = require('express');
const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/UserRoutes');
const movieRouter = require('./routes/MovieRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);


app.listen(8080, ()=>{
    console.log("server started at port 8080");
});