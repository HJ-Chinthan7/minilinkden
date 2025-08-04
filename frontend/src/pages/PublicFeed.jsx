import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import '../styles/PublicFeed.css';

function PublicFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts || data);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('Network error. Please try again.'+err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  if (loading) {
    return (
      <div className="feed-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={fetchPosts} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Public Feed</h1>
        <p>Discover posts from our community</p>
      </div>

          {user && (
            <div className="create-post-section">
              <h2>Create a Post</h2>
              <PostForm user={user.name} onPost={handleNewPost} />
            </div>
          )}

          <div className="posts-section">
            <h2>Recent Posts</h2>
            <PostList 
              posts={posts} 
              onPostUpdate={fetchPosts} 
              user={user} 
            />
          </div>
    </div>
  );
}

export default PublicFeed;
