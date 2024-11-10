import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPostById } from '../store/slices/postsSlice';
import { fetchCommentsByPostId } from '../store/slices/commentsSlice';
import { fetchUserById } from '../store/slices/usersSlice';
import { RootState, AppDispatch } from '../store/store';


interface PostDetailsProps {
    darkMode: boolean;
  }

const PostDetails: React.FC <PostDetailsProps> = ({ darkMode }) => {
  const { postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const currentPost = useSelector((state: RootState) => state.posts.currentPost);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const user = useSelector((state: RootState) => state.users.user);
 // Assuming darkMode is stored in the state

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(Number(postId)));
      dispatch(fetchCommentsByPostId(Number(postId)));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (currentPost) {
      dispatch(fetchUserById(currentPost.userId));
    }
  }, [dispatch, currentPost]);

  return (
    <div className={`post-details ${darkMode ? 'dark' : 'light'}`}>
      <motion.div
        className="post"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: darkMode ? '20px 30px' : '15px 25px',
          backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
          color: darkMode ? '#fff' : '#333',
        }}
      >
        {currentPost && (
          <>
            <h2 style={{ color: darkMode ? 'purple' : 'darkblue' }}>{currentPost.title}</h2>
            <p>{currentPost.body}</p>
          </>
        )}
      </motion.div>

      <motion.div
        className="comments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: darkMode ? '20px 30px' : '15px 25px',
          backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
          color: darkMode ? '#fff' : '#333',
        }}
      >
        <h3 style={{ color: darkMode ? 'purple' : 'darkblue' }}>Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment" style={{ padding: '10px 15px' }}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        ))}
      </motion.div>

      {user && (
        <motion.div
          className="user-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            padding: darkMode ? '20px 30px' : '15px 25px',
            backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
            color: darkMode ? '#fff' : '#333',
          }}
        >
          <h3 style={{ color: darkMode ? 'purple' : 'darkblue' }}>User Info:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </motion.div>
      )}
    </div>
  );
};

export default PostDetails;
