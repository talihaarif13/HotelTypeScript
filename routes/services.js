const express = require("express");
var router = express.Router();
const serviceController = require("../controllers/services");



router.post("/", serviceController.createService);
router.post('/addService', serviceController.addRoomService);
router.get('/', serviceController.fetchRoomServices);
router.delete('/', serviceController.deleteService);

module.exports = router;
