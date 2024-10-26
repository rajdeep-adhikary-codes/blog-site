// src/components/Auth/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const token = useSelector((state) => state.auth.token); // Get the token from Redux
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is already logged in, redirect to home
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);

    const handleLogin = async () => {
        await dispatch(login({ email, password }));
        // Handle any success or error notifications if needed
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} className="btn btn-dark btn-block mt-3">Login</button>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
