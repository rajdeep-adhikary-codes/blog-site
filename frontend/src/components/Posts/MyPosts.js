// src/components/MyPosts.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPosts, deletePost } from '../../redux/actions/postActions';
import { useNavigate } from 'react-router-dom';
import './Post.css'; // Import shared CSS

const MyPosts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token); // Assuming you store the token in the auth state
    const posts = useSelector((state) => state.posts.userPosts);
    const [loadingId, setLoadingId] = useState(null); // State to track which post is being deleted

    useEffect(() => {
        if (user && token) {
            dispatch(fetchUserPosts(user.user_id, token)); // Pass user ID and token
        }
    }, [dispatch, user, token]);

    // Function to handle post deletion with a loading indicator
    const handleDeletePost = async (postId) => {
        setLoadingId(postId); // Set loading ID for the specific post
        await dispatch(deletePost(postId, token)); // Dispatch delete action with the token
        setLoadingId(null); // Clear loading ID after deletion
        dispatch(fetchUserPosts(user.user_id, token)); // Refresh posts list
    };

    const handleEdit = (postId) => {
        navigate(`/edit-post/${postId}`); // Navigate to edit post page
    };

    const handleReadPost = (postId) => {
        navigate(`/post/${postId}`); // Navigate to the PostDetail page
    };

    const handleBack = () => {
        navigate(`/home`);
    };

    return (
        <div className="my-posts-container container mt-4">
            <div className='row'>
                <div className='col-sm-6'>
                    <h2>My Posts</h2>
                </div>
                <div className='col-sm-6 text-end'>
                    <div className="mb-3">
                        <button className="btn btn-secondary" onClick={handleBack}>Back To Home</button>
                    </div>
                </div>
            </div>
            {posts && posts.length > 0 ? (
                <ul className="list-group">
                    {posts.map(post => (
                        <div key={post._id} className="list-group-item mb-3 border rounded">
                            <h5>{post.title}</h5>
                            <h6 className="text-muted">Author: {post.author}</h6>
                            <p>{post.content.substring(0, 400)}...</p>
                            <div className='d-flex justify-content-end'>
                                <button className="btn btn-dark me-2" onClick={() => handleReadPost(post._id)}>Read Post</button>
                                <button className="btn btn-dark me-2" onClick={() => handleEdit(post._id)}>Edit</button>
                                <button 
                                    className="btn btn-dark" 
                                    onClick={() => handleDeletePost(post._id)} 
                                    disabled={loadingId === post._id}>
                                    {loadingId === post._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default MyPosts;
