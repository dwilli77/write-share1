const router = require("express").Router();
const userRoutes = require("./user");
const podRoutes = require('./pod');
const contentRoutes = require('./content')

// user routes
router.use("/user", userRoutes);

// pods routes
router.use('/pod', podRoutes);

router.use('/content', contentRoutes);


module.exports = router;
