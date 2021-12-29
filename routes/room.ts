import express from "express";
var router = express.Router();
const roomController = require('../controllers/room');
const formValidation = require('../validations/formValidation');
const verifyMiddleware = require('../middlewares/verify');

router.post('/', formValidation.validate('createRoom'), verifyMiddleware.verifyToken,roomController.createRoom);
router.get('/', verifyMiddleware.verifyToken, roomController.getHotelRooms);
router.put('/', formValidation.validate('roomIDValidation'), verifyMiddleware.verifyToken, roomController.updateHotelRoom);

module.exports = router;