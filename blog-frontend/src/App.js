import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';  // Pour afficher un seul post
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div>
        <h1>Blog Management</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />  {/* Route pour afficher un post spécifique */}
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
