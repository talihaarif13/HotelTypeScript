import { Request, Response } from "express";
const reservationModel = require('../models').Reservation;
const roomModel = require('../models').room;

module.exports.createReservation = async (req:any, res:Response) => {
    try{
        let room = await roomModel.findByPk(req.body.room_id);
        if(!room){
            res.status(400).json({error : "room does not exists"});
            return;
        }
        console.log("user_id", req.data);
        let exist_reservation = await reservationModel.findOne({
            where : {
                customer_id:req.data.user_id,
                room_id:req.body.room_id
            }
        });
        if(!exist_reservation){
            let reservation =  await reservationModel.create({
                starting_date : req.body.starting_date,
                ending_date : req.body.ending_date,
                customer_id : req.data.user_id
            });
            // console.log(reservationModel.associations);
            // let customer = await customerModel.findByPk(req.data.user_id);
            // console.log("customer", customer);
            // await customer.addReservation(reservation);
            
            await room.setReservation(reservation);
            //update status of reserved room
            let room_status = await roomModel.update({
                status : "not available"
            }, {
                where : {
                    id : req.body.room_id
                }
            });
            res.status(200).json(reservation);
        }else{
            res.status(200).json({err : "already exist"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
};
module.exports.updateReservation = async(req:any, res:Response) => {
    try{
        let update_data : any = {};
        if(req.body.starting_date){
            update_data.starting_date = req.body.starting_date;
        }
        if(req.body.ending_date){
            update_data.ending_date = req.body.ending_date;
        }
        console.log(update_data);
        let update_reservation = await reservationModel.update(update_data, {
            where : {
                customer_id : req.data.user_id,
                room_id : req.body.room_id
            }
        });
        res.status(200).json(update_reservation);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
module.exports.deleteSpecificRoomReservation = async(req:any, res:Response) => {
    try{
        let update_room_status = await roomModel.update({
            status : "available"
        }, {
            where : {
                id : req.body.room_id
            }
        });
        let delete_specific = await reservationModel.destroy({
            where : {
                customer_id : req.data.user_id,
                room_id : req.body.room_id
            }
        });
        res.status(200).json(delete_specific);
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
module.exports.deleteUserAllReservation = async(req:any, res:Response) => {
    try{
        let reserved_user_rooms = await reservationModel.findAll({
            where : {
                customer_id : req.data.user_id
            },
            attributes : ['room_id'],
        });
        const arr : any =[];
        reserved_user_rooms.forEach(( room: any )=> {
            arr.push(room['room_id']) ;
        })
        await roomModel.update({status : 'available'}, { where : { id : arr } });
        let cancel_reservation = await reservationModel.destroy({
            where : {
                customer_id : req.data.user_id
            }
        });
        res.status(200).json(cancel_reservation);
        
    }catch(err){
        console.log(err);
        res.status(500).json({'error' : err });
    }
}
