const userController = require('../controllers/userController');
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const validator = require('../middlewares/validator');


module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/user`;
    app.post(`${baseUrl}/login`, validator.loginValidate, userController.login);
    app.post(`${baseUrl}/sign-up`, validator.customRegisterValidate, userController.register);
};