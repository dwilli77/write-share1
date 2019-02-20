const router = require("express").Router();
const podController = require("../../controllers/podscontroller");

// Matches with "/api/user"
router.route("/")
    .post(podController.create)
    .get(podController.read);
 
router.route('/mypods')
    .post(podController.getMyPods)

router.route('/currentpod')
    .post(podController.getOnePod)

router.route('/nextuser')
    .post(podController.nextUser)

router.route('/join')
    .post(podController.joinPod)

router.route('/yourturn')
    .post(podController.yourTurn)
    
module.exports = router;
