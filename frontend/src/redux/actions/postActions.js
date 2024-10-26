// src/redux/actions/postActions.js
import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
} from '../types';
import { getPosts, addPostAPI, getUserPosts, removePost, getPostById, updatePostAPI } from '../../api/requests';

export const fetchPosts = () => async (dispatch, getState) => {
    const { auth } = getState();
    const token = auth.token;

    try {
        const response = await getPosts(token);
        dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_POSTS_FAILURE,
            payload: error.response ? error.response.data.message : "Failed to fetch posts.",
        });
    }
};

export const addPost = (postData) => async (dispatch, getState) => {
    const { auth } = getState();
    const token = auth.token;

    try {
        await addPostAPI(postData, token); // Call API to add post
        dispatch({
            type: ADD_POST_SUCCESS,
            payload: postData,
        });
        dispatch(fetchPosts()); // Fetch updated posts after adding
    } catch (error) {
        dispatch({
            type: ADD_POST_FAILURE,
            payload: error.response ? error.response.data.message : "Failed to add post.",
        });
    }
};


export const fetchUserPosts = (userId, token) => {
    return async (dispatch) => {
        try {
            const response = await getUserPosts(userId, token);
            dispatch({ type: 'FETCH_USER_POSTS', payload: response.data.data });
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        }
    };
};

export const deletePost = (postId, token) => {
    return async (dispatch) => {
        try {
            await removePost(postId, token);
            dispatch({ type: 'DELETE_POST', payload: postId });
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };
};

export const fetchPostById = (postId, token) => async (dispatch) => {
    try {
        const response = await getPostById(postId, token);
        dispatch({ type: 'FETCH_POST_BY_ID_SUCCESS', payload: response.data.data[0] });
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

export const updatePost = (postId, updatedPost, token) => async (dispatch) => {
    try {
        await updatePostAPI(postId, updatedPost, token);
        dispatch({ type: 'UPDATE_POST_SUCCESS', payload: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
    }
};
