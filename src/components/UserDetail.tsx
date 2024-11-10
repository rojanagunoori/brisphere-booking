import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById, fetchPostsByUserId, fetchTodosByUserId, fetchAlbumsByUserId } from '../store/slices/usersSlice';
import { RootState, AppDispatch } from '../store/store';


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
    <div className={`user-detail-container ${darkMode ? 'dark' : 'light'}`}>
      {user && (
        <div className="user-detail">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Address: {address}</p>
          <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
        </div>
      )}

      {/* Posts Section */}
      <div className="user-posts">
        <h3>Posts</h3>
        <ul className="post-list">
          {posts.length ? (
            posts.map((post) => (
              <li key={post.id} className="post-item">
                <Link to={`/posts/${post.id}`} className="post-link">
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </ul>
      </div>

      {/* Todos Section */}
      <div className="user-todos">
        <h3>Todos</h3>
        <ul className="todo-list">
          {todos.length ? (
            todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span>{todo.title}</span>
                {todo.completed && <span className="completed-status">Completed</span>}
              </li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      </div>

      {/* Albums Section */}
      <div className="user-albums">
        <h3>Albums</h3>
        <ul className="album-list">
          {albums.length ? (
            albums.map((album) => (
              <li key={album.id} className="album-item">
                <span>{album.title}</span>
              </li>
            ))
          ) : (
            <p>No albums available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDetail;
