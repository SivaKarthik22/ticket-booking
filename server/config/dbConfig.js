const mongoose = require('mongoose');

//const connectionString = process.env.CONNECTION_STRING;
const connectionString = "mongodb+srv://sivakarthik:lR6t9bn1r5msQzmy@cluster0.fgnzm.mongodb.net/MDMS?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connectionString);

const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("db connection successful");
});

connection.on("error", ()=>{
    console.log("db connection failed");
});