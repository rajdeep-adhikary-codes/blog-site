// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import PostDetail from './components/Posts/PostDetail'; 
import AddPost from './components/Posts/AddPost'; 
import MyPosts from './components/Posts/MyPosts'; 
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'; 
import EditPost from './components/Posts/EditPost';

const App = () => {
    const token = useSelector((state) => state.auth.token); // Get token from auth state

    return (
        <Router>
            {token && <Header />} {/* Render Header only if user is authenticated */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/post/:id" 
                    element={
                        <ProtectedRoute>
                            <PostDetail />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/add-post" 
                    element={
                        <ProtectedRoute>
                            <AddPost />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-posts" 
                    element={
                        <ProtectedRoute>
                            <MyPosts /> 
                        </ProtectedRoute>
                    } 
                />
                <Route
                    path="/edit-post/:id"
                    element={
                        <ProtectedRoute>
                            <EditPost />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
