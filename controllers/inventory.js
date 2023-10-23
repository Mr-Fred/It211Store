const Product = require('../models/products');
const database = require('../models/database.js');

// const cnx = new Database();

// const product = new Products();

class Inventory {

  constructor(body) {
    this.body = body
    
  }

  async addProd() {
    /*
    receive a post request to add a new product to the database.
    */
    try {
      const newProduct = new Product(this.body);

      const savedProduct = await newProduct.save();
      console.log('Product created', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async deleteProduct(prod_id) {
    /* 
    receive a delete request with prod_id to delete the corresponding document.
    */
    try {

      let deletedProduct = await Product.findByIdAndDelete(prod_id);
      return deletedProduct;
    } catch (error) {
      throw error
    }
  }

  async updateProduct(prod_id) {
    /*
    receive a put request to update a product by using its prod_id.
    
    */
    const filter = {_id: prod_id};
    const update = this.body;
    
    try {
      let updatedProduct = await Product.findOneAndUpdate(filter, update);
      if (updatedProduct) {
        return updatedProduct
      } else {
        updatedProduct = await this.addProd();
      }
      return updatedProduct;
    } catch (error) {
      throw error
    }
  }

  async updateStock(body) {
    const updatedProducts = [];
    for (let i = 0; i < body.length; i++) {
      const filter = { _id: body[i] }; 
      const update = { $inc: {stock: -1} };
      
  
      try {
        const updatedProduct = await Product.findByIdAndUpdate(filter, update, {new: true});
       
        if (updatedProduct) {
          updatedProducts.push(updatedProduct);
        }
      } catch (error) {
        throw error;
      }
  }
  return updatedProducts;
}
}

module.exports = Inventory;