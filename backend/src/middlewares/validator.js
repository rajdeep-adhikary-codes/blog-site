const responseLib = require('../libs/responseLib');

const Joi = require('joi').extend(require('@joi/date'));


const customLoginValidateSchema = Joi.object({
    email: Joi.string().email()
        .required(),
    password: Joi.string()
        .required()
});

const customRegisterValidateSchema = Joi.object({
    name: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
    email: Joi.string().email().required()
});

const addPostValidateSchema = Joi.object({
    content: Joi.string()
        .required(),
    title: Joi.string()
        .required()
});

const getPostValidateSchema = Joi.object({
    post_id: Joi.string(),
    user_id: Joi.string()
});

const updatePostValidateSchema = Joi.object({
    post_id: Joi.string()
        .required(),
    title: Joi.string()
        .required(),
    content: Joi.string()
        .required(),
});

const deletePostValidateSchema = Joi.object({
    post_id: Joi.string()
        .required()
});

const addCommentValidateSchema = Joi.object({
    comment: Joi.string()
        .required(),
    post_id: Joi.string()
        .required()
});


let loginValidate = async(req, res, next) => {
    try {
        const value = await customLoginValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let customRegisterValidate = async(req, res, next) => {
    try {
        const value = await customRegisterValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let addPostValidate = async(req, res, next) => {
    try {
        const value = await addPostValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}


let getPostValidate = async(req, res, next) => {
    try {
        const value = await getPostValidateSchema.validate(req.query);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let updatePostValidate = async(req, res, next) => {
    try {
        const value = await updatePostValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let deletePostValidate = async(req, res, next) => {
    try {
        const value = await deletePostValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let addCommentValidate = async(req, res, next) => {
    try {
        const value = await addCommentValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}


module.exports = {
    loginValidate: loginValidate,
    customRegisterValidate: customRegisterValidate,
    addPostValidate: addPostValidate,
    getPostValidate: getPostValidate,
    updatePostValidate: updatePostValidate,
    deletePostValidate: deletePostValidate,
    addCommentValidate: addCommentValidate
}