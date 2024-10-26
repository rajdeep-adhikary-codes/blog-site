// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    // If token is not present, redirect to login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children; // Render the children if authenticated
};

export default ProtectedRoute;
