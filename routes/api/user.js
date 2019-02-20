const router = require("express").Router();
const userController = require("../../controllers/usercontroller");

// Matches with "/api/user"
router.route("/")
  .post(userController.login);

  // "/api/user/new"
router.route("/new")
    .post(userController.register)



module.exports = router;
