import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user: currentUser } = useContext(AuthContext);
console.log(currentUser);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [currentUser]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.id}`);
      const data = await response.json();
      setProfile(data.user);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.id}/posts`);
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
 
  if (!profile) {
    return (
      <div className="profile-container">
        <div className="error-message">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <img 
            src={profile.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"} 
            alt={profile.firstName } 
            className="profile-avatar"
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-username">{profile.username}</h1>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profile.followersCount || 0}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profile.followingCount || 0}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <div className="profile-details">
            <h2 className="profile-name">{profile.firstName} {profile.lastName}</h2>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
            {profile.location && (
              <p className="profile-location">
                <span className="icon">📍</span> {profile.location}
              </p>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="profile-website">
                {profile.website}
              </a>
            )}
            <p className="profile-joined">
              Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h3 className="posts-header">My Posts</h3>
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-content">
                  <p>{post.content}</p>
                  {post.image && <img src={post.image} alt="Post" className="post-image" />}
                </div>
                <div className="post-meta">
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="post-stats">
                    <span>❤️ {post.likesCount || 0}</span>
                    <span>💬 {post.commentsCount || 0}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <p>No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
