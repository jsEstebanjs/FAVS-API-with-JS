const {Schema , model} = require("mongoose");

const listSchema = new Schema(
    {
        name:{
            type:String,
            minlength: [3, "the minimum length is 3"],
            maxlength: [300, "the maximum length is 300"],
            required: [true, "Name is required"],
        },
        fav: {
            type: [{ type: Schema.Types.ObjectId, ref: "favs" }],
            required: false
          }
    },
    {
        timestamps:true 
    }
);
//video en string es como se llamara nuestra coleccion
const List = model("list",listSchema);

module.exports = List;