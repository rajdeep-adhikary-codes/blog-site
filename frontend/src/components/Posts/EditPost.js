// src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../redux/actions/postActions';
import './Post.css'; // Shared CSS for all post components

const EditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const post = useSelector((state) => state.posts.currentPost); 

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(fetchPostById(id, token));
    }, [dispatch, id, token]);
    

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedPost = { title, content };
        dispatch(updatePost(id, updatedPost, token));
        navigate('/my-posts'); // Redirect back to My Posts
    };

    return (
        <div className="edit-post-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate} className="edit-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                        rows={10}
                    />
                </div>
                <button type="submit" className="submit-button">Update Post</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/my-posts')}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default EditPost;
