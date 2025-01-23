const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Post = require('./models/Post');  // Assure-toi que ce modèle existe

dotenv.config();

// Initialiser l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const MONGO_URI = 'mongodb://localhost:27017/blogdb';  // Remplace par ton URI MongoDB
const PORT = 5000;

// Connexion à MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Routes pour les posts

// Créer un post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ message: err.message });
  }
});

// Récupérer tous les posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Récupérer un post spécifique
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rechercher des posts par mot-clé dans le titre ou le contenu
// Rechercher des posts par mot-clé dans le titre ou le contenu
app.get('/api/posts/search', async (req, res) => {
  const { query } = req.query;  // Récupérer le terme de recherche depuis les paramètres de l'URL
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Utiliser l'opérateur $regex de MongoDB pour effectuer la recherche insensible à la casse
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },  // Recherche insensible à la casse dans le titre
        { content: { $regex: query, $options: 'i' } }  // Recherche insensible à la casse dans le contenu
      ]
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.json(posts);  // Retourner les posts trouvés
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
