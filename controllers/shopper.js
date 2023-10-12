const Product = require('../models/products.js');
const Cart = require('../models/cart.js');
const Orders = require('../models/orders.js');

class Shopper {

  constructor() {
      
    
    }

  async readAllProds() {
    /* 
    receive a get request to display all avalaible product.
    */
    try {
      // const newProduct = new Product(this.body);
      const products =  await Product.find();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    await this.readCart();
    await this.getTotal();
  }
    
  async getProductById(prod_id) {
    /* 
    receive a get request with a prod_id to display a specific product page.
    */
    try {
      const product = await Product.findById(prod_id);
      return product;
    } catch (error) {
      console.error(error)
      throw error;
    }

  }

  async addToCart(body) {
    /*
    receive a post request with a product id to add that specific prod_id to the cart collection.
    
    */
    try {
      let addToCart = new Cart(body);
      let addedToCart = await addToCart.save();

      return addedToCart;
      
    } catch (error) {
      console.error("Error adding to cart...");
      throw error;
    }
    
  }

  async readCart() {
    /*
    receive a get request to display to all the products in the cart.
    */

    try {
      let cartItems = await Cart.find();
      return cartItems;
    } catch (error) {
      throw error;
    }
  }

  async getTotal(cartItems) {
    /*
    receive a get request to display the checkOut page and call sumItems to sum the total price of products in the cart.
    */
    try {
      let sum = 0;
      // let cartItems = await this.readCart();
      for (let i = 0; i < cartItems.length; i++) {
        sum += cartItems[i].price;
      }
      return sum;
    } catch (error) {
      throw error
    }
    
  }

  async checkout() {
    /*
    receive a request to add all the data in cart collection to the order collection.
    */
    let cartItems = await this.readCart();
    let orderAmount = await this.getTotal(cartItems);

    // orderAmount = await Promise.resolve(orderAmount);
    
    try {

      let orderedItems = [];
      let orderedItemIds = [];
      
      for (let i = 0; i < cartItems.length; i++) {
         orderedItems.push(cartItems[i].product_name);
         orderedItemIds.push(cartItems[i].product_id.toString());

      }
      
      let body = {
        item_ids: orderedItemIds,
        ordered_items: orderedItems,
        order_amount: orderAmount
      }
      console.log(orderedItemIds)
      const orders = new Orders(body);
      await orders.save();
      return orders;
      
    } catch (error) {
      throw error;
    }
      
  }

  async submitOrder() {
    /*
    receive a post request to add all the products in cart to a Order collection. 
    
    */
  }

  async removeProd(prod_id) {
    /*
    receive a put request to decrement the stock value of prod_id in products collection.
    */
    try {
        let product = await Cart.findByIdAndDelete(prod_id);
        return product;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = Shopper;