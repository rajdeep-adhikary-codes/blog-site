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
        <div className="edit-post-container container mt-4">
            <div className='row'>
                <div className='col-sm-6'>
                    <h2>Edit Post</h2>
                </div>
                <div className='col-sm-6 text-end'>
                    <div className="mb-3">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/my-posts')}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleUpdate} className="edit-post-form">
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                        rows={10}
                        required
                    />
                </div>
                <div className='d-flex w-100 justify-content-center'>
                    <button type="submit" className="btn btn-dark me-2 w-100">Update Post</button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
