const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;

async function connectDB(){
    try{
        await mongoose.connect(connectionString);
        console.log("Connected to DB")
    }
    catch(error){
        console.log("Error connecting to DB", error);
    }
}

module.exports = connectDB;