// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postActions';
import AddPost from '../Posts/AddPost'; // Import the AddPost component
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Use Link for navigation
import './Home.css'; // Your CSS for styling

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const token = useSelector((state) => state.auth.token);
    const [showAddPost, setShowAddPost] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        dispatch(fetchPosts()); // Fetch posts on load
    }, [dispatch]);

    const toggleAddPost = () => {
        setShowAddPost(!showAddPost);
    };

    const handleReadPost = (postId) => {
        navigate(`/post/${postId}`); // Navigate to the PostDetail page
    };

    return (
        <div className="home-container">
            <h1>All Posts</h1>
            {showAddPost && <AddPost closeModal={toggleAddPost} />} {/* Render AddPost component */}
            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post._id} className="post mt-3">
                        <h2>{post.title}</h2>
                        <h5>Author: {post.author}</h5>
                        <p>{post.content.substring(0, 400)}...</p>
                        <button onClick={() => handleReadPost(post._id)}>Read Post</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
