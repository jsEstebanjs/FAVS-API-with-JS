const app = require("./app")
const { connect } = require("./db");

const port = 8080;

connect();
 
app.listen(port,()=>{
    console.log("app is run")
});
