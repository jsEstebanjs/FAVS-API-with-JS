const router = require("express").Router();
const favsController = require("../controllers/favs.controller");


router.route("/").get(favsController.list);
router.route("/:id").get(favsController.show);
router.route("/:id").post(favsController.create);
router.route("/:id").delete(favsController.destroy);


module.exports = router;