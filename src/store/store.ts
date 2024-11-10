import { configureStore, Middleware } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import commentsReducer from './slices/commentsSlice';
import usersReducer from './slices/usersSlice';
import albumsReducer from './slices/albumsSlice';
import photosReducer from './slices/photosSlice';
import todosReducer from './slices/todosSlice';

// Define the loggerMiddleware with correct types
const loggerMiddleware: Middleware = store => next => action => {
   // console.log('Logger Middleware triggered'); // This should always be logged if middleware is applied correctly
    if (typeof action === 'function') {
     // console.log('Dispatching thunk action');
    } else {
      //console.log('Dispatching action:', action);
     // console.log('State before action:', store.getState());
      next(action);  // Make sure to forward the action
    //  console.log('State after action:', store.getState());
    }
  };
  
  

  const store = configureStore({
    reducer: {
        posts: postsReducer,
      comments: commentsReducer,
      users: usersReducer,
      albums: albumsReducer,
      photos: photosReducer,
      todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware), // Make sure this is correct
    devTools: process.env.NODE_ENV !== 'production',
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
