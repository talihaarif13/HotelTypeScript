const express = require('express');
const app = express()
var bodyParser = require("body-parser");
const hotelRoutes = require('./routes/hotel');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const reservationRoutes = require('./routes/reservation');
const serviceRoutes = require('./routes/services');




app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/hotel', hotelRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/reservation', reservationRoutes);
app.use('/services', serviceRoutes);

app.listen(3000, () => {
    console.log("app listening on 3000");
})