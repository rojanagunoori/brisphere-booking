import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className={`main-content ${darkMode ? 'dark' : 'light'}`}>
        <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/users" element={<Users toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/users/:userId" element={<UserDetail darkMode={darkMode} />} />
          <Route path="/users/:userId/posts" element={<PostsList darkMode={darkMode} />} />
          <Route path="/posts" element={<PostsList darkMode={darkMode} />} />
          <Route path="/posts/:postId" element={<PostDetail darkMode={darkMode}/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;





/**
 * // App.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchPosts, fetchPostById } from './store/slices/postsSlice';
import { fetchCommentsByPostId } from './store/slices/commentsSlice';
import { fetchPhotosByAlbumId } from './store/slices/photosSlice';
import { fetchTodosByUserId } from './store/slices/todosSlice';
import store from './store/store';  // <-- Import the store here

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();  // Typing dispatch
  const posts = useSelector((state: RootState) => state.posts.posts);
  const currentPost = useSelector((state: RootState) => state.posts?.currentPost);
  const comments = useSelector((state: RootState) => state.comments?.comments || []);
  const user = useSelector((state: RootState) => state.users?.user);
  const albums = useSelector((state: RootState) => state.albums?.albums || []);
  const photos = useSelector((state: RootState) => state.photos?.photos || []);
  const todos = useSelector((state: RootState) => state.todos?.todos || []);
  const loadingPosts = useSelector((state: RootState) => state.posts?.loading);
  const loadingComments = useSelector((state: RootState) => state.comments?.loading);
  const loadingUser = useSelector((state: RootState) => state.users?.loading);
  const loadingAlbums = useSelector((state: RootState) => state.albums?.loading);
  const loadingPhotos = useSelector((state: RootState) => state.photos?.loading);
  const loadingTodos = useSelector((state: RootState) => state.todos?.loading);

  useEffect(() => {
    console.log('Dispatching fetchPosts');
    dispatch(fetchPosts());
  }, [dispatch]);

  // Log the Redux state to the console after posts have been fetched
  useEffect(() => {
    console.log('Current Redux State: ', store.getState());  // This will now work because store is imported
  }, [posts]); // This will log the state whenever posts change

  const handlePostClick = (postId: number) => {
    dispatch(fetchPostById(postId));
    dispatch(fetchCommentsByPostId(postId));

    const userId = currentPost?.userId;  // Ensure currentPost is not null
    if (userId) {
      dispatch(fetchPhotosByAlbumId(userId));
      dispatch(fetchTodosByUserId(userId));
    }
  };

  return (
    <div className="App">
      <h1>Brisphere Workation Platform</h1>
      <h2>Posts</h2>
      {loadingPosts && <p>Loading posts...</p>}
      {posts.length === 0 && !loadingPosts && <p>No posts available.</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <h3 onClick={() => handlePostClick(post.id)}>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      {currentPost && (
        <>
          <h3>Post Details</h3>
          <div>
            <h4>{currentPost.title}</h4>
            <p>{currentPost.body}</p>
          </div>

          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id}>
                <h5>{comment.name}</h5>
                <p>{comment.body}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default App;

 */








/*import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Book from './pages/Book';
import './styles/App.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      
      <div className="content">
       
        <div>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </div>
        <div id="discover">
          <Discover />
        </div>

        <div id="services">
          <Services />
        </div>

        

        <div id="book">
          <Book />
        </div>
      </div>
      <div id="about-us">
      <Footer />
        </div>
      
    </div>
  );
};

export default App;

*/



/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Book from './pages/Book';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import './styles/App.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div  className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="content">
        <Routes>
     
          
          
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/" element={<Discover />} />
          <Route path="/book" element={<Book />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
*/