// src/redux/reducers/postsReducer.js
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from '../types';

const initialState = {
    posts: [],
    loading: false,
    error: null,
    currentPost: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'FETCH_POST_BY_ID_SUCCESS':
            return {
                ...state,
                currentPost: action.payload, // Ensure payload has the post data
            };
        case 'FETCH_USER_POSTS':
            return {
                ...state,
                userPosts: action.payload,
            };
        case 'DELETE_POST':
            return {
                ...state,
                userPosts: state.userPosts.filter(post => post.id !== action.payload),
            };
        default:
            return state;
    }
};

export default postsReducer;
