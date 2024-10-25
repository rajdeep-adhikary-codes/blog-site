// src/components/Posts/AddPost.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/actions/postActions'; // Ensure you have this action
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Post.css'; // CSS file for styling

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const token = useSelector((state) => state.auth.token); // Get the token from Redux

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = { title, content };
        await dispatch(addPost(post, token));
        navigate('/home'); // Redirect to home after successful post
    };

    return (
        <div className="add-post-container">
            <h2>Add New Post</h2>
            <button type='button' className='back-button' onClick={()=> {navigate(-1)}}>Back</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        rows={10}
                        required 
                    ></textarea>
                </div>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default AddPost;
