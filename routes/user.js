const express = require("express");
var router = express.Router();
const userController = require("../controllers/user");


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/fetchReservations', userController.fetchUserReservations);




module.exports = router;
