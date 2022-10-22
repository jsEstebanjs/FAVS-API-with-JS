const router = require("express").Router();
const userController = require("../controllers/usercontroller");

router.route("/login").post(userController.signin);
router.route("/register").post(userController.signup);


module.exports = router;

