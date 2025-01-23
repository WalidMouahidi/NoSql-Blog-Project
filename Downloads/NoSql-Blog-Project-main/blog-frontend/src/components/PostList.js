import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');  // État pour le terme de recherche
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const navigate = useNavigate();

  // Récupérer les posts avec pagination et tri
  const fetchPosts = async (page = 1, sortBy = 'createdAt', order = 'desc') => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=10&sortBy=${sortBy}&order=${order}`);
      setPosts(response.data.posts);
      setFilteredPosts(response.data.posts);  // Afficher tous les posts par défaut
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, order]);

  // Gérer l'entrée de recherche
  const handleSearch = async () => {
    if (!query.trim()) {
      setFilteredPosts(posts);  // Si la requête est vide, afficher tous les posts
      return;
    }

    try {
      console.log('Sending search query:', query);  // Log the search query
      const response = await axios.get(`http://localhost:5000/api/posts/search?query=${query}`);
      console.log('Search response:', response.data);  // Log the response data
      setFilteredPosts(response.data);  // Afficher les résultats de la recherche
    } catch (error) {
      console.error('Error searching posts:', error);
      setFilteredPosts([]);  // Aucun résultat trouvé pour cette recherche
    }
  };

  // Gérer la suppression d'un post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setFilteredPosts(filteredPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Gérer le changement de page
  const handlePageChange = (page) => {
    fetchPosts(page, sortBy, order);
  };

  // Gérer le changement de tri
  const handleSortChange = (sortField) => {
    const newOrder = sortBy === sortField && order === 'desc' ? 'asc' : 'desc';
    setSortBy(sortField);
    setOrder(newOrder);
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <button onClick={() => navigate('/create')}>Create Post</button>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title or content"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <button onClick={() => handleSortChange('createdAt')}>
          Sort by Date {sortBy === 'createdAt' && (order === 'desc' ? '↓' : '↑')}
        </button>
        <button onClick={() => handleSortChange('title')}>
          Sort by Title {sortBy === 'title' && (order === 'desc' ? '↓' : '↑')}
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>  // Message lorsque aucun post n'est trouvé
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => navigate(`/posts/${post._id}`)}>View Details</button>  {/* Bouton pour consulter un post spécifique */}
              <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>  {/* Bouton pour modifier un post */}
              <button onClick={() => handleDelete(post._id)}>Delete</button>  {/* Bouton pour supprimer un post */}
            </li>
          ))}
        </ul>
      )}

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;