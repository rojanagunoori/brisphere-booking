import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; // Import AppDispatch
import { fetchPosts } from '../store/slices/postsSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PostsListProps {
  darkMode: boolean;
}

const PostsList: React.FC<PostsListProps> = ({ darkMode }) => {
  const dispatch = useDispatch<AppDispatch>();  // Correctly type dispatch
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());  // Dispatching the async thunk to fetch posts
  }, [dispatch]);

  if (loading) return <div className={`loading ${darkMode ? 'dark' : 'light'}`}>Loading...</div>;
  if (error) return <div className={`error ${darkMode ? 'dark' : 'light'}`}>Error: {error}</div>;

  return (
    <motion.div
      className={`posts-list ${darkMode ? 'dark' : 'light'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        padding: darkMode ? '20px 30px' : '15px 25px',
        backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
        color: darkMode ? '#fff' : '#333',
      }}
    >
      <h2 className="posts-header" style={{ color: darkMode ? 'purple' : 'darkblue' }}>Posts</h2>
      <ul>
        {posts.map(post => (
          <motion.li
            key={post.id}
            className="post-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
                listStyle:"none",
                padding: darkMode ? '20px 30px' : '15px 25px',
                backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
                color: darkMode ? '#fff' : '#333',
              }}
          >
            <Link style={{listStyle:"none",textDecoration:"none"}} to={`/posts/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PostsList;
