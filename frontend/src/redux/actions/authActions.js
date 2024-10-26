// src/redux/actions/authActions.js
import { signup as signupApi, login as loginApi } from '../../api/requests';
import { useNavigate } from 'react-router-dom';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';

export const signup = (userData) => async (dispatch) => {
    try {
        const response = await signupApi(userData);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SIGNUP_FAILURE,
            payload: error.response?.data?.message || "Signup failed!",
        });
    }
};

// Login action
export const login = (credentials) => async (dispatch) => {
    try {
        const response = await loginApi(credentials);
        console.log("Login response:", response);  // Log the response
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
        dispatch({
            type: SET_TOKEN,
            payload: response.data.data.token,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "Login failed!",
        });
    }
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGOUT' });
    };
};