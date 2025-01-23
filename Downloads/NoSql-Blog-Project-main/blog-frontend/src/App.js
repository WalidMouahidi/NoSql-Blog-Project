import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="container">
      <div className="navbar">
        <h1>Blog Management</h1>
        {isLoggedIn && <button onClick={handleSignOut}>Sign Out</button>}
      </div>
      <Routes>
        <Route path="/" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;