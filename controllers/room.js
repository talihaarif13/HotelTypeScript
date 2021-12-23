const roomModel = require('../models').room;
const hotelModel = require('../models').Hotel;

module.exports.createRoom = async(req, res) => {
    try{
        let room = await roomModel.create({
            'status': "available",
            "price" : req.body.price
        });
        //let hotel = await hotelModel.findByPk(req.body.id);
        //create hotel association
        let hotel = await hotelModel.findOne({
            where : {
                id : req.body.hotel_id
            }
        });
        await room.setHotel(hotel);
        res.status(200).json('done');
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
        // if(err instanceof ValidationError){
        //     res.status(400).json({'error' : err.errors[0].message})
        // }else{
        //     res.status(500).json({'error' : err });
        // }
    }
};
module.exports.getHotelRooms = async (req,res) => {
    try{
        let hotel_rooms = await roomModel.findAll({
            where: {
                hotel_id : req.body.hotel_id
            }
        });
        res.status(200).json(hotel_rooms);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
        // if(err instanceof ValidationError){
        //     res.status(400).json({'error' : err.errors[0].message})
        // }else{
        //     res.status(500).json({'error' : err });
        // }
    }
};
module.exports.updateHotelRoom = async (req, res) => {
    try{
        let update_data = {};
        if(req.body.price){
            update_data.price = req.body.price;
        }
        let room = roomModel.update(update_data, {
            where : {
                id : req.body.room_id
            }
        });
        res.status(200).json(room);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
        // if(err instanceof ValidationError){
        //     res.status(400).json({'error' : err.errors[0].message})
        // }else{
        //     res.status(500).json({'error' : err });
        // }
    }
}