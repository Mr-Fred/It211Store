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
      let total = await this.getTotal(cartItems);
      return {cartItems, total};
      
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

  async submitOrder() {
    /*
    receive a request to add all the data in the cart collection to the order collection.
    */
    try {
      
      let {cartItems, total} = await this.readCart();
      let orderedItemIds = cartItems.map(item => item.product_id.toString());
      let orderedItems = cartItems.map(item => item.product_name);


      let body = {
        item_ids: orderedItemIds,
        ordered_items: orderedItems,
        order_amount: total
      }

      const orders = new Orders(body);
      await orders.save();
      return orders;
      
    } catch (error) {
      return error;
    }
  }

  async clearCart() {
    /*
    receive a delete request to clear the product in the cart.
    */
    try {
      
      let cleared = await Cart.deleteMany({})
      // await Cart.db.collection.drop('orders');
      console.log("Order submitted and Cart Cleared");
      return true;
    } catch (error) {
      throw error
    }
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

  async clearOrders() {
    /*
    receive a delete request to clear the orders collection.
    */
    try {
      
      let cleared = await Orders.deleteMany({})
      // await Cart.db.collection.drop('orders');
      console.log("Orders collection cleared");
      return true;
    } catch (error) {
      throw error
    }
  }
  
}

module.exports = Shopper;