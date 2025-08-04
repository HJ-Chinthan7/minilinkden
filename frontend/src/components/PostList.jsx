import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/PostList.css';

function PostList({ posts, onPostUpdate }) {
  const { user } = useContext(AuthContext);

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (onPostUpdate) {
          onPostUpdate();
        }
      } else {
        throw new Error(data.error || 'Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      alert(error.message || 'Failed to like post. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorName = (author) => {
    if (!author) return 'Anonymous User';
    return `${author.firstName || ''} ${author.lastName || ''}`.trim() || author.email || 'Anonymous User';
  };

  const getAuthorInitial = (author) => {
    if (!author) return 'U';
    const name = getAuthorName(author);
    return name.charAt(0).toUpperCase();
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="no-posts">
        <h3>No posts yet</h3>
        <p>Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <div className="user-info">
              <div className="user-avatar">
                {getAuthorInitial(post.author)}
              </div>
              <div>
                <h4>{getAuthorName(post.author)}</h4>
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          
          <div className="post-actions">
            <button 
              className={`like-btn ${post.likes?.includes(user?._id) ? 'liked' : ''}`}
              onClick={() => handleLike(post._id)}
              disabled={!user}
            >
              <span className="heart-icon">❤️</span>
              <span className="like-count">{post?.likes?.length || 0}</span>
            </button>
            <span className="comment-count">
              💬 0 comments
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
