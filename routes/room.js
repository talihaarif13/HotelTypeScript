const express = require("express");
var router = express.Router();
const roomController = require('../controllers/room');



router.post('/', roomController.createRoom);
router.get('/', roomController.getHotelRooms);
router.put('/', roomController.updateHotelRoom);
module.exports = router;