const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(connectionString);

const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("db connection successful");
});

connection.on("error", ()=>{
    console.log("db connection failed");
});