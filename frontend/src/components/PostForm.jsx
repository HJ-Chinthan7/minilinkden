import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/PostForm.css';

function PostForm({ onPost }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    if (!user) {
      setError('Please login to create a post');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content.trim(),
          image: image.trim() || undefined,
          author: user.id
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        onPost(data.data);
        setContent('');
        setImage('');
      } else {
        throw new Error(data.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      
      if (error.message.includes('401')) {
        setError('Please login to create a post');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="post-form login-prompt">
        <div className="login-message">
          <h3>Welcome to MiniLinkedIn</h3>
          <p>Please login to share your thoughts with the community</p>
          <button 
            className="login-button" 
            onClick={() => window.location.href = '/login'}
          >
            Login to Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="user-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <span className="user-name">{user?.name || user?.email || 'You'}</span>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`What's on your mind, ${user?.name || 'friend'}?`}
        required
        maxLength={500}
        rows={3}
      />
      
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="image-input"
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-actions">
        <span className="char-count">{content.length}/500</span>
        <button type="submit" disabled={loading || !content.trim()}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
