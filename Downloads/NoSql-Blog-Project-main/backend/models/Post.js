const mongoose = require('mongoose');

// Définir le schéma pour un post
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Créer un modèle de post basé sur le schéma
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
