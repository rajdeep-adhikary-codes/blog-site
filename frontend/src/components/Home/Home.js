// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postActions';
import AddPost from '../Posts/AddPost';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure to include custom styles if necessary

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const token = useSelector((state) => state.auth.token);
    const [showAddPost, setShowAddPost] = useState(false);
    const [sortOption, setSortOption] = useState('date-newest-first');
    const [filterAuthor, setFilterAuthor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPosts(token)); // Fetch posts with token
    }, [dispatch, token]);

    const toggleAddPost = () => {
        setShowAddPost(!showAddPost);
    };

    const handleReadPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    // Sort and filter logic
    const sortedPosts = [...posts].sort((a, b) => {
        switch (sortOption) {
            case 'date-newest-first':
                return new Date(b.created_at) - new Date(a.created_at); // New to old
            case 'date-oldest-first':
                return new Date(a.created_at) - new Date(b.created_at); // Old to new
            case 'title-asc':
                return a.title.localeCompare(b.title); // A to Z
            case 'title-desc':
                return b.title.localeCompare(a.title); // Z to A
            default:
                return 0; // No sorting
        }
    });

    const filteredPosts = sortedPosts.filter((post) =>
        filterAuthor ? post.author.toLowerCase().includes(filterAuthor.toLowerCase()) : true
    );

    return (
        <div className="home-container container mt-4">
            <div className="row mb-3">
                <div className="col-md-6">
                    <h1>All Posts</h1>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Sort by:</label>
                    <select 
                        className="form-select" 
                        onChange={(e) => setSortOption(e.target.value)} 
                        value={sortOption}
                    >
                        <option value="date-newest-first">Date - New to Old</option>
                        <option value="date-oldest-first">Date - Old to New</option>
                        <option value="title-asc">Title - A to Z</option>
                        <option value="title-desc">Title - Z to A</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Search by Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author name"
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-3">
                {showAddPost && <AddPost closeModal={toggleAddPost} />}
            </div>

            <div className="posts-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post._id} className="card mb-3">
                            <div className="card-body">
                                <h2 className="card-title">{post.title}</h2>
                                <h5 className="card-subtitle mb-2 text-muted">Author: {post.author}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Upload Date: {post.created_at}</h6>
                                <p className="card-text">{post.content.substring(0, 500)}...</p>
                                <div className='d-flex w-100 justify-content-end'>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={() => handleReadPost(post._id)}
                                    >
                                        Read Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
