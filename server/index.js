const express = require('express');
const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/UserRoutes');
//const cors = require('cors');

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);

/*app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));*/


app.listen(8080, ()=>{
    console.log("server started at port 8080");
});