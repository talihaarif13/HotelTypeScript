const { body } = require('express-validator');
module.exports.validate = (method) => {
    switch(method) {
        case 'createUser' : {
            return [
                body('email', 'email does not exists').exists(),
                body('password', 'password does not exists').exists()
            ]
        }
        case 'roomIDValidation' : {
            return [
                body('room_id', 'Room id does not exists').exists()
            ]
        }
        case 'createRoom' : {
            return [
                body('hotel_id', 'Hotel id does not exists').exists()
            ]
        }
    }
}
