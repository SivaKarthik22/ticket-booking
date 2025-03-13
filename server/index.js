const express = require('express');
const app = express();
const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/UserRoutes');
app.use(express.json());
app.use('/api/users', userRouter);

app.listen(8080, ()=>{
    console.log("server started at port 8080");
});