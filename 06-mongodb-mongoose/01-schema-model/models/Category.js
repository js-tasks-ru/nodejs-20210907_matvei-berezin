const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});


const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subcategories: [
    subCategorySchema,
  ],
});

// const Category = mongoose.model('Category', categorySchema);

module.exports = connection.model('Category', categorySchema);
