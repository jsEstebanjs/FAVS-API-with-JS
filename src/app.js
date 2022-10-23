const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user.route");
const listRouter = require("./routes/list.route");
const favsRouter = require("./routes/favs.route");

const app = express();

//para poder recibir un body
app.use(express.json());
app.use("/auth/local",userRouter);
app.use("/api/favs",listRouter);
app.use("/favs",favsRouter);


module.exports = app