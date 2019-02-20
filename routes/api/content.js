const router = require("express").Router();
const contentController = require("../../controllers/contentcontroller")

// Matches with "/api/content"
router.route("/")
    .post(contentController.create)
 
// Matches with "/api/content/current"
// router.route('/current')
//     .post(contentController.read)


module.exports = router;
