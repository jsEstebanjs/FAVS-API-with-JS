const {Schema , model} = require("mongoose");

const favsSchema = new Schema(
    {
        title:{
            type:String,
            minlength: [3, "the minimum length is 3"],
            maxlength: [300, "the maximum length is 300"],
            required: [true, "title is required"],
        },
        description:{
            type:String,
            minlength: [10, "the minimum length is 10"],
            maxlength: [300, "the maximum length is 300"],
            required: [true, "title is required"],
        },

    },
    {
        timestamps:true 
    }
);
//video en string es como se llamara nuestra coleccion
const Favs = model("favs",favsSchema);

module.exports = Favs;

//para buscar una lista