const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: { type: String, required: true },
  cast: { type: Array, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  rateing: {type: Number, required: true},
  release: {type: Date, required: true},
  user_rateing : {type: Array, required: true}
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;