const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showsSchema = new Schema({
  title: { type: String, required: true },
  cast: { type: Array, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  rateing: {type: Number, required: true},
  release: {type: Date, required: true},
  user_rateing : {type: Array, required: true}
});

const Shows = mongoose.model('Shows', showsSchema);

module.exports = Shows;