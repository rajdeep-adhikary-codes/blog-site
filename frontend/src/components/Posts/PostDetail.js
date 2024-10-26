// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import { getPostById, addComment } from '../../api/requests'; 
import './Post.css'; // Custom CSS file if needed

const PostDetail = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState(''); 
    const token = useSelector((state) => state.auth.token); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchPost = async () => {
            if (token) { 
                try {
                    const response = await getPostById(id, token); 
                    setPost(response.data.data[0]); 
                } catch (error) {
                    console.error("Error fetching post:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPost();
    }, [id, token]); 

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); 

        if (!comment) return; 

        try {
            await addComment(id, { comment }, token);
            setComment('');
            const updatedPost = await getPostById(id, token);
            setPost(updatedPost.data.data[0]); 
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="post-detail-container container mt-4">
            <div className="mb-3 w-100 d-flex justify-content-end">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            {post ? (
                <>
                    <h2 className="post-title">{post.title}</h2>
                    <h5 className="post-author">By: {post.author}</h5>
                    <h6 className="post-author">Upload Date: {post.created_at}</h6>
                    <p className="post-content">{post.content}</p>
                    <h4 className="comments-header">Comments:</h4>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <div key={index} className="comment mb-2 border p-2 rounded">
                                <strong className="comment-author">{comment.commented_by}:</strong>
                                <p className="comment-text">{comment.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments available</p>
                    )}
                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="comment-form mt-3">
                        <textarea
                            className="form-control mb-2"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={handleCommentChange}
                            rows="4"
                        />
                        <button type="submit" className="btn btn-dark">Comment</button>
                    </form>
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
};

export default PostDetail;
