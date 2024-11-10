import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div className="home">
      <motion.div
      style={{padding:"1rem"}}
        className="posts-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Brisphere Workation</h1>
        </motion.div> 
      <motion.div
        className="posts-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="post"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          >
            <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
            <p>{post.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
