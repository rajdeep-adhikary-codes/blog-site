// src/components/Posts/AddPost.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/actions/postActions';
import { useNavigate } from 'react-router-dom';
import './Post.css'; // Custom CSS file if needed

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
        <div className="add-post-container container mt-4">
            <div className='row'>
                <div className='col-sm-6'>
                    <h2 className="mb-4">Add New Post</h2>
                </div>
                <div className='col-sm-6 text-end'>
                    <button 
                        type='button' 
                        className='btn btn-secondary mb-3' 
                        onClick={() => { navigate(-1); }}
                    >
                        Back
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="card p-4">
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content:</label>
                    <textarea 
                        className="form-control" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        rows={10}
                        required 
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-dark">
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
