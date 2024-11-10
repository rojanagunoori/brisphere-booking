import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/usersSlice';
import { RootState, AppDispatch } from '../store/store';
import './Users.css';

// Add props for dark mode and the toggle function
interface UsersProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Users: React.FC<UsersProps> = ({ toggleDarkMode, darkMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);  
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={`users-container ${darkMode ? 'dark' : 'light'}`}>
     
      <h2>Users List</h2>
      <ul className="user-list">
        {users && users.length > 0 ? (
          users.map(user => (
            <li key={user.id} className="user-item">
              <Link to={`/users/${user.id}`} className="user-link">
                <div className="user-details">
                  <h3>{user.name}</h3>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div>No users found</div>
        )}
      </ul>
    </div>
  );
};

export default Users;
