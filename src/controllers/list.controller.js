const List = require("../models/list.model");
const User = require("../models/user.model")

module.exports = {
  //GET : optenemos todas las listas
  async list(req, res) {
    try {
      const list = await List.find().populate("fav","title description");
      console.log(list)
      res.status(200).json({ message: "List found", data: list });

    } catch (err) {
      res.status(404).json({ message: "List not found", data: err });
    }
  },

  //GET POR ID
  async show(req, res) {
    try{
      const { id} = req.params;

      const list = await List.findById(id).populate("fav","title description");

      res.status(200).json({ message: "List found", data: list});

    }catch(err){
      res.status(400).json({ message: "list not found", data: err });
    }

  },

  //POST crear list
  async create(req, res) {
    try{

      const data = req.body;
    
      const user = await User.findById(req.user);
  
      if (!user) {
        throw new Error("User does not exist")
      }
  
      const list = await List.create({ ...data, user: req.user })

      user.listFav.push(list)
      await user.save({ validateBeforeSave: false })

      res.status(200).json({ message: "List create", data: list });


    }catch(err){
      res.status(400).json({ message: "List not create", error: err });

    }

  },

  //Detele id
  async destroy(req, res) {
    try{
      const { id } = req.params;
      console.log(req.params)

      const list = await List.findByIdAndDelete(id);

      res.status(200).json({ message: "List Delete", data: list });

    }catch(err){

      res.status(400).json({ message: "List not Delete", data: err });

    }


  },
};
