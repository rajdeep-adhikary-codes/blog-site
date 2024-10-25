const response = require('./../libs/responseLib')
const check = require('../libs/checkLib')
const tokenLib = require('../libs/tokenLib');
const passwordLib = require('../libs/passwordLib');
const mongoose = require('mongoose');
const UserModel = mongoose.model('Users');


let login = async(req, res) => {

    try {
        let finduser = await UserModel.findOne({email : req.body.email}).select('-__v').lean();

        if (check.isEmpty(finduser)) {
            res.status(404);
            throw new Error('User not Registered!');
        };

        if (await passwordLib.verify(req.body.password, finduser.password)) {
            
            let payload = {
                user_id: finduser._id,
                name: finduser.name,
                token: await tokenLib.generateToken(finduser)
            };
            let apiResponse = response.generate(false, 'logged in!', payload);
            res.status(200).send(apiResponse);

        } else {
            res.status(401);
            throw new Error('incorrect password!');
        }
    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

let register = async(req, res) => {
    try {
        let finduser = await UserModel.findOne({ email : req.body.email }).lean();
        let newUser = new UserModel({
            name : req.body.name,
            email : req.body.email,
            password : await passwordLib.hash(req.body.password),
        });
        if (check.isEmpty(finduser)) {

            let payload = (await newUser.save()).toObject();

            delete payload.__v;
            delete payload._id;
            delete payload.password;

            let apiResponse = response.generate(false, 'User Signed Up Successfully ', payload);
            res.status(200).send(apiResponse);
        } else {
            res.status(412);
            throw new Error('User Already Registered!');
        }
    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

async function getUsernameById(id) {
    let user = await UserModel.findById(id).lean();
    return (!check.isEmpty(user) && user.hasOwnProperty('name')) ? user.name : "Anonymous";
}

module.exports = {
    login: login,
    register: register,
    getUsernameById: getUsernameById
}