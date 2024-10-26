const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const mongoose = require('mongoose');
const PostModel = mongoose.model('Posts');
const userController = require('./userController');


const addPost = async(req, res) => {
    try {
        const { title, content } = req.body;

        console.log(req.user);
        

        const author = req.user._id;

        const newPost = new PostModel({
            title : title,
            author : new mongoose.Types.ObjectId(author),
            content : content
        })

        let payload = (await newPost.save()).toObject();

        delete payload.__v;
        delete payload._id;

        let apiResponse = response.generate(false, 'Post Added Successfully ', payload);
        res.status(200).send(apiResponse);

    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

const getPost = async(req, res) => {
    try {
        
        let { post_id, user_id } = req.query;

        const matchParams = {};

        if(!check.isEmpty(post_id)){            
            matchParams._id = new mongoose.Types.ObjectId(post_id);
        }
        else if(!check.isEmpty(user_id)){
            matchParams.author = new mongoose.Types.ObjectId(user_id);
        }
        else{

        }

        let posts = await getPostsByConditions(matchParams);

        if(posts.length < 1){
            let apiResponse = response.generate(false, 'Post Not Found ', posts);
            res.status(200).send(apiResponse);
        }
        else{
            let apiResponse = response.generate(false, 'Post Found ', posts);
            res.status(200).send(apiResponse);
        }

    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

const updatePost = async(req, res) => {
    try {
        const { post_id, title, content } = req.body;

        const findPost = await PostModel.findById(post_id).lean();

        if(check.isEmpty(findPost)){
            let apiResponse = response.generate(false, 'Post Not Found ', findPost);
            return res.status(200).send(apiResponse);
        }

        const user_id = req.user._id;

        if(findPost.author.toString() !== user_id){
            let apiResponse = response.generate(false, 'This post cannot be edited by you ', findPost);
            return res.status(200).send(apiResponse);
        }

        let post = {
            title : title,
            content : content
        }

        const updated = await PostModel.updateOne({_id : new mongoose.Types.ObjectId(post_id)}, post, {new : true});

        let apiResponse = response.generate(false, 'Post Updated ', updated);
        res.status(200).send(apiResponse);

    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

const deletePost = async(req, res) => {
    try {
        const { post_id } = req.body;

        const findPost = await PostModel.findById(post_id).lean();

        if(check.isEmpty(findPost)){
            let apiResponse = response.generate(false, 'Post Not Found ', findPost);
            return res.status(200).send(apiResponse);
        }

        const user_id = req.user._id;

        if(findPost.author.toString() !== user_id){
            let apiResponse = response.generate(false, 'This post cannot be deleted by you ', findPost);
            return res.status(200).send(apiResponse);
        }

        const deleted = await PostModel.deleteOne({_id : new mongoose.Types.ObjectId(post_id)});

        if(deleted){
            let apiResponse = response.generate(false, 'Post Deleted Successfully ', {});
            res.status(200).send(apiResponse);
        }
        else{
            throw new Error("Unable to delete post");            
        }

    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

const addComment = async(req, res) => {
    try {
        const { post_id, comment } = req.body;
        const commented_by = req.user._id;

        const findPost = await PostModel.findById(post_id).lean();

        if(check.isEmpty(findPost)){
            let apiResponse = response.generate(false, 'Post Not Found ', findPost);
            return res.status(200).send(apiResponse);
        }

        let commentObj = {
            commented_by : new mongoose.Types.ObjectId(commented_by),
            comment : comment
        }

        let prevComments = findPost.comments;

        prevComments.push(commentObj);

        let commentedPost = {
            ...findPost,
            comments : prevComments
        }

        console.log(commentedPost);
        

        let updatedPost = await PostModel.updateOne({ _id : new mongoose.Types.ObjectId(post_id) }, commentedPost, {new : true});

        let apiResponse = response.generate(false, 'Comment Added Successfully', updatedPost);
        res.status(200).send(apiResponse);

    } catch (err) {
        let apiResponse = response.generate(true, err.message, null);
        res.send(apiResponse);
    }
}

async function getPostsByConditions(matchParams) {
    try {
        let posts = await PostModel.aggregate([
            {
              $match: matchParams
            },
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'authordtls'
              }
            },
            {
              $unwind: "$authordtls"
            },
            {
              $project: {
                _id : 1,
                title : 1,
                content : 1,
                comments : 1,
                "authordtls.name": 1,
                created_at: 1
              }
            }
        ]);

        await Promise.all(posts.map(async(post) => {
            post.author = post.authordtls.name;
            let comments = post.comments;
            for (const comment of comments) {
                comment.commented_by = await userController.getUsernameById(comment.commented_by);
            }
            delete post.authordtls;
            return post;
        }));

        return posts;

    } catch (error) {
        console.log(error.message);
        return [];
    }
}

module.exports = {
    addPost: addPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost,
    addComment: addComment
}