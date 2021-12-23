const customerModel = require('../models').customer;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const reservationModel = require('../models').Reservation;
const roomModel = require('../models').room;

module.exports.signup = async(req, res)  => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password.toString(), salt);
        const user = await customerModel.create({
            'name' : req.body.name,
            'email' : req.body.email,
            'password' : hashed_password,
            'address' : req.body.address,
            'phone' : req.body.phone
        });
        res.status(200).json(user);
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
module.exports.login = async(req,res) => {
    try{
        if(req.body.email && req.body.password){
            let user = await customerModel.findOne({
                where : {
                    email : req.body.email
                }
            });
            if(!user){
                res.status(400).json({'err': 'user not found'});
            }
            const validPassword = await bcrypt.compare(req.body.password.toString(), user.password);
            if(validPassword){
                console.log(typeof(user));
                console.log(user.email);
                const jwt_token = jwt.sign({
                    user_id : user.id
                }, 'secret', {expiresIn:'5h'});
                user = user.toJSON(); 
                user.token = jwt_token;
                res.status(200).json(user);
            }
            else{
                res.status(400).json({ error: "Invalid Password" });
            }
        }else{
            res.status(400).json({'error' : 'not valid data'});
        }
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
module.exports.fetchUserReservations = async(req, res )=>{
    try{
        let user_reservations = await reservationModel.findAll({
            where : {
                customer_id : req.body.user_id
            }
        });
        res.status(200).json(user_reservations);
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

