// src/redux/reducers/authReducer.js
import { SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, SET_TOKEN } from '../actions/authActions';

const initialState = {
    user: null,
    token: null,  // Add token to the state
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.data,  // Save user data
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload, 
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
