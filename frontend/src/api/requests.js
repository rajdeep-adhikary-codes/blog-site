// src/api/requests.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/';

// Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Signup API
export const signup = (userData) => {
    return api.post('/user/sign-up', userData);
};

// Login API
export const login = (credentials) => {
    return api.post('/user/login', credentials);
};



// Get Posts API
export const getPosts = (token) => {
    return api.get('/post/get', {
        headers: {
            token: `${token}`, 
        },
    });
};

// Get Post by ID API
export const getPostById = (id, token) => {
    return api.get(`/post/get?post_id=${id}`, { // Adjust this endpoint based on your API
        headers: {
            token: `${token}`,
        },
    });
};

export const addComment = async (postId, commentData, token) => {
    commentData.post_id = postId;
    return api.post(`/post/comment`, commentData, {
        headers: {
            token: `${token}`,
        },
    });
};


export const addPostAPI = async (post, token) => {
    return api.post(`/post/add`, post, {
        headers: {
            token: `${token}`,
        },
    });
};



export const getUserPosts = (userId, token) => {
    return api.get(`/post/get?user_id=${userId}`, { // Adjust this endpoint based on your API
        headers: {
            token: `${token}`,
        },
    });
};


export const removePost = (postId, token) => {
    return api.post(`/post/delete`, { post_id: postId}, { // Adjust this endpoint based on your API
        headers: {
            token: `${token}`,
        },
    });
};


export const updatePostAPI = (postId, updatedData, token) => {
    return api.post(`/post/update`, { post_id: postId, ...updatedData }, {
        headers: {
            token: `${token}`,
        },
    });
};