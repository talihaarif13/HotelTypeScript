const express = require('express');
const app = express()
var bodyParser = require("body-parser");
const hotelRoutes = require('./routes/hotel');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const reservationRoutes = require('./routes/reservation');
const serviceRoutes = require('./routes/services');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


//make uploads folder static to access photos
app.use('/uploads', express.static('uploads'));

//parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use('/hotel', hotelRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/reservation', reservationRoutes);
app.use('/services', serviceRoutes);

app.listen(3000, () => {
    console.log("app listening on 3000");
})