const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
},
                                          {timestamps: true,}                                         );

// Create and export the 'Product' model
const Products = mongoose.model('Product', productSchema);

module.exports = Products;
