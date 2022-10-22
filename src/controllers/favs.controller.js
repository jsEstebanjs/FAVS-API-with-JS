const List = require("../models/list.model");
const Favs = require("../models/favs.model");

module.exports = {
  //GET : optenemos todos los fav
  async list(req, res) {
    try {
      const favs = await Favs.find();

      res.status(200).json({ message: "Favs found", data: favs });

    } catch (err) {
      res.status(404).json({ message: "Favs not found", data: err });
    }
  },

  //GET POR ID
  async show(req, res) {
    try{
      const { id } = req.params;

      const fav = await List.findById(id)

      res.status(200).json({ message: "Fav found", data: fav});

    }catch(err){
      res.status(400).json({ message: "Fav not found", data: err });
    }

  },

  //POST crear fav
  async create(req, res) {
    try{

      const data = req.body;

      const { id } = req.params
      console.log(id)
    
      const list = await List.findById(id);
  
      if (!list) {
        throw new Error("List does not exist")
      }
  
      const fav = await Favs.create({ ...data, list: id  })

      list.fav.push(fav)
      await list.save({ validateBeforeSave: false })

      res.status(200).json({ message: "Fav create", data: fav });


    }catch(err){
      console.log(err)
      res.status(400).json({ message: "Fav not create", error: err });

    }

  },

  //Detele id
  async destroy(req, res) {
    try{
      const { favId } = req.params;

      const fav = await Favs.findByIdAndDelete(favId);

      res.status(200).json({ message: "Fav Delete", data: fav });

    }catch(err){

      res.status(400).json({ message: "Fav not Delete", data: err });

    }


  },
};
