// src/components/Header.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions'; // Import logout action
import './Posts/Post.css'; // Importing the shared CSS file

const Header = () => {
    const dispatch = useDispatch(); // Moved dispatch inside the component
    const user = useSelector((state) => state.auth.user); // Get user information from Redux store

    const handleLogout = () => {
        dispatch(logout());
        // Optionally redirect or show a message here
    };

    return (
        <header className="header-container">
            <h1 className="logo">Blog Site</h1>
            <div className="user-info">
                {user ? (
                    <div>
                        <Link to="/add-post">
                            <a className='addButton'>Add New Post</a>
                        </Link>
                        <div className="dropdown">
                            <span className="user-name">{user.name}<span className="caret">▼</span></span>
                            <div className="dropdown-content">
                                <Link to="/my-posts">My Posts</Link>
                                <a href="#" onClick={handleLogout}>Logout</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="guest-info">
                        <Link to="/login" className="login-link">Login</Link>
                        <Link to="/signup" className="signup-link">Signup</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
