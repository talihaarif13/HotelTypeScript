const express = require("express");
var router = express.Router();
const hotelController = require("../controllers/hotel");
const verifyMiddleware = require('../middlewares/verify');


router.post("/", verifyMiddleware.verifyToken, hotelController.createHotel);
router.put("/", verifyMiddleware.verifyToken, hotelController.updateHotel);
router.delete("/", verifyMiddleware.verifyToken, hotelController.deleteHotel);
router.get("/", verifyMiddleware.verifyToken , hotelController.fetchHotels);

module.exports = router;
