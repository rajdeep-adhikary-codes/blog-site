// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate(); // Initialize useNavigate
    const [success, setSuccess] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        await dispatch(signup({ name, email, password }));
        
        // Check if the signup was successful
        if (!error) {
            setSuccess(true);
            navigate('/login');  // Redirect to login page
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="text-center">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Signup successful! Redirecting...</div>}
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control mb-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSignup} className="btn btn-dark btn-block mt-3">Sign Up</button>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
