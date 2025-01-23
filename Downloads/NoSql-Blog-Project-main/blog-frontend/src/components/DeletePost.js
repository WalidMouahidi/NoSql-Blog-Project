import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePost = () => {
  const { id } = useParams();  // Récupération de l'ID du post à supprimer
  const navigate = useNavigate();

  useEffect(() => {
    const deletePost = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);  // Envoi de la requête DELETE
        alert('Post deleted successfully');
        navigate('/');  // Redirection vers la page d'accueil après la suppression
      } catch (error) {
        console.error('There was an error deleting the post!', error);
        alert('Failed to delete post');
      }
    };

    deletePost();  // Appel de la fonction de suppression
  }, [id, navigate]);

  return <div>Deleting post...</div>;  // Affichage d'un message pendant la suppression
};

export default DeletePost;
