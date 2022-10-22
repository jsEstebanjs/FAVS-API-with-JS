const express = require("express");
require("dotenv").config();
const { connect } = require("./db");
const userRouter = require("./routes/user.route");
const listRouter = require("./routes/list.route");
const favsRouter = require("./routes/favs.route");

const app = express();
const port = 8080;

//para poder recibir un body
app.use(express.json());

connect();
 
app.use("/auth/local",userRouter);
app.use("/api/favs",listRouter);
app.use("/favs",favsRouter);

app.listen(port,()=>{
    console.log("app is run")
});
