import express from "express";
import { Request, Response } from "express";
var router = express.Router();
const hotelController = require("../controllers/hotel");
const verifyMiddleware = require('../middlewares/verify');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:any) {
        cb(null, 'uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req:any, file:any, cb:any) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage});

router.post("/", verifyMiddleware.verifyToken, upload.single('picture') , hotelController.createHotel);
router.put("/", verifyMiddleware.verifyToken, hotelController.updateHotel);
router.delete("/", verifyMiddleware.verifyToken, hotelController.deleteHotel);
router.get("/", verifyMiddleware.verifyToken , hotelController.fetchHotels);

module.exports = router;
