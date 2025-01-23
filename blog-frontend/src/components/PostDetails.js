import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();  // Récupère l'ID du post depuis l'URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);  // Utilisation de l'ID dans l'URL
        setPost(response.data);  // Mettre à jour l'état avec le post récupéré
      } catch (error) {
        console.error('There was an error fetching the post!', error);
      }
    };

    fetchPost();
  }, [id]);  // Utilisation de l'ID comme dépendance pour le hook

  if (!post) return <p>Loading...</p>;  // Afficher un message pendant le chargement

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostDetails;
