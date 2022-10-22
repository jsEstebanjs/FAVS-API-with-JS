const mongoose = require("mongoose");

function connect(){
    const mongoUri = process.env.MONGO_URI;

    mongoose.connect(mongoUri);
    mongoose.connection.once("open",()=>{
        console.log("connect with mongo")
    });
    mongoose.connection.on("error",(err)=>{
        console.log("error with connect mongo", err)
    });

    return mongoose.connection;
}
module.exports = { connect }