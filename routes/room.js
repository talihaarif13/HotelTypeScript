const express = require("express");
var router = express.Router();
const roomController = require('../controllers/room');
const formValidation = require('../validations/formValidation');


router.post('/', formValidation.validate('createRoom'),roomController.createRoom);
router.get('/', roomController.getHotelRooms);
router.put('/', formValidation.validate('roomIDValidation'), roomController.updateHotelRoom);

module.exports = router;