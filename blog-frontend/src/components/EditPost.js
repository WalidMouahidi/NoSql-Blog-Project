import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Importation de useParams et useNavigate

const EditPost = () => {
  const { id } = useParams();  // Récupération de l'ID du post à partir de l'URL
  const navigate = useNavigate();  // Pour rediriger après la mise à jour
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fonction pour récupérer le post à éditer
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error('There was an error fetching the post!', error);
      }
    };

    fetchPost();  // Appel de la fonction pour récupérer le post à éditer
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, content };
      await axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost);  // Envoi de la mise à jour du post
      alert('Post updated successfully');
      navigate('/');  // Redirection vers la page d'accueil après la modification
    } catch (error) {
      console.error('There was an error updating the post!', error);
      alert('Failed to update post');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
