import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');  // État pour le terme de recherche
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Récupérer tous les posts au chargement initial
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);  // Afficher tous les posts par défaut
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Gérer l'entrée de recherche
  const handleSearch = async () => {
    if (!query.trim()) {
      setFilteredPosts(posts);  // Si la requête est vide, afficher tous les posts
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/search?query=${query}`);
      setFilteredPosts(response.data);  // Afficher les résultats de la recherche
    } catch (error) {
      console.error('Error searching posts:', error);
      setFilteredPosts([]);  // Aucun résultat trouvé pour cette recherche
    }
  };
  

  return (
    <div>
      <h2>Blog Posts</h2>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title or content"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>  // Message lorsque aucun post n'est trouvé
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to={`/posts/${post._id}`}>View Details</Link>  {/* Lien pour consulter un post spécifique */}
              <br />
              <Link to={`/edit/${post._id}`}>Edit</Link>  {/* Lien pour modifier un post */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
