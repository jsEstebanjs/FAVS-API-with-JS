const router = require("express").Router();
const listController = require("../controllers/list.controller");
const { auth } = require("../utils/auth")

router.route("/").get(listController.list);
router.route("/:id").get(listController.show);
router.route("/").post(auth,listController.create);
router.route("/:id").delete(listController.destroy);


module.exports = router;