const postController = require('../controllers/postController');
const appConfig = require("../../config/appConfig");
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');


module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/post`;
    app.post(`${baseUrl}/add`, auth.isAuthorized, validator.addPostValidate, postController.addPost);
    app.get(`${baseUrl}/get`, auth.isAuthorized, validator.getPostValidate, postController.getPost);
    app.post(`${baseUrl}/update`, auth.isAuthorized, validator.updatePostValidate, postController.updatePost);
    app.post(`${baseUrl}/delete`, auth.isAuthorized, validator.deletePostValidate, postController.deletePost);
    app.post(`${baseUrl}/comment`, auth.isAuthorized, validator.addCommentValidate, postController.addComment);
};