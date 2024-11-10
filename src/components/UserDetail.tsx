import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById, fetchPostsByUserId, fetchTodosByUserId, fetchAlbumsByUserId } from '../store/slices/usersSlice';
import { RootState, AppDispatch } from '../store/store';
import { motion } from 'framer-motion';

interface UserDetailProps {
  darkMode: boolean;
}

const UserDetail: React.FC<UserDetailProps> = ({ darkMode }) => {
  const { userId } = useParams(); // Getting userId from the URL
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.users.user);
  const posts = useSelector((state: RootState) => state.users.posts);
  const todos = useSelector((state: RootState) => state.users.todos);
  const albums = useSelector((state: RootState) => state.users.albums);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(Number(userId)));
      dispatch(fetchPostsByUserId(Number(userId)));
      dispatch(fetchTodosByUserId(Number(userId)));
      dispatch(fetchAlbumsByUserId(Number(userId)));
    }
  }, [dispatch, userId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const address = user?.address
    ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
    : 'No address available';

  return (
    <motion.div
      className={`user-detail-container ${darkMode ? 'dark' : 'light'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ padding: "2rem", borderRadius: "8px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      {user && (
        <motion.div
          className="user-detail"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Address: {address}</p>
          <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
        </motion.div>
      )}

      {/* Posts Section */}
      <motion.div
        className="user-posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <h3>Posts</h3>
        <ul className="post-list">
          {posts.length ? (
            posts.map((post) => (
              <motion.li
                key={post.id}
                className="post-item"
                whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link to={`/posts/${post.id}`} className="post-link">
                  {post.title}
                </Link>
              </motion.li>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </ul>
      </motion.div>

      {/* Todos Section */}
      <motion.div
        className="user-todos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h3>Todos</h3>
        <ul className="todo-list">
          {todos.length ? (
            todos.map((todo) => (
              <motion.li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span>{todo.title}</span>
                {todo.completed && <span className="completed-status">Completed</span>}
              </motion.li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      </motion.div>

      {/* Albums Section */}
      <motion.div
        className="user-albums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h3>Albums</h3>
        <ul className="album-list">
          {albums.length ? (
            albums.map((album) => (
              <motion.li
                key={album.id}
                className="album-item"
                whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span>{album.title}</span>
              </motion.li>
            ))
          ) : (
            <p>No albums available</p>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default UserDetail;
