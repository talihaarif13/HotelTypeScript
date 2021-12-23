const express = require("express");
var router = express.Router();
const hotelController = require("../controllers/hotel");
const verifyMiddleware = require('../middlewares/verify');


router.post("/", hotelController.createHotel);
router.put("/", hotelController.updateHotel);
router.delete("/", hotelController.deleteHotel);
router.get("/", verifyMiddleware.verifyToken , hotelController.fetchHotels);

module.exports = router;
