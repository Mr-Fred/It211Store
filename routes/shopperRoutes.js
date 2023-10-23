const express = require('express');
const router = express.Router();
const Shopper = require('../controllers/shopper.js')
const Inventory = require('../controllers/inventory.js');

router.route('/').get(async (req, res) => {
  try {
    const shopper = new Shopper();
    const products = await shopper.readAllProds();

    res.render('index', {products});
  } catch (error) {
    console.error('Error fecting products:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.route('/product/:prod_id').get(async (req, res) => {

  const shopper = new Shopper();
  const prod_id = req.params.prod_id;

  try {
    const product = await shopper.getProductById(prod_id);
    res.render('product', {product});
  } catch (error) {
    console.error(error);
  }
});

router.route('/cart/addtocart').post(async (req, res) => {

  const shopper = new Shopper();
  const body = req.body;
  try {
    const addedToCart = await shopper.addToCart(body);
    res.status(200);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

router.route('/cart').get( async (req, res) => {
  const shopper = new Shopper();
  try {
    let cart = await shopper.readCart();
    res.render('cart', {cart});
    
  } catch (error) {
    console.error(error);
  }

});

router.route('/cart/:prod_id').post( async (req, res) => {
  const shopper = new Shopper();
  try {
    let deletedProduct = await shopper.removeProd(req.params.prod_id);
    
    res.redirect('/cart');
  } catch (error) {
    console.log(error)
  }
  
});

router.route('/checkout').get(async (req, res) => {
 
  const shopper = new Shopper();

  try {
    let orderSummary = await shopper.submitOrder();
    
    res.render('checkout', {orderSummary}); 
    
  } catch (error) {
    throw error
  }
});

router.route('/order').post(async (req, res) => {
  const shopper = new Shopper();
  const body = req.body.item_ids.split(',');
  const inventory = new Inventory();

  try {

    let updatedProducts = await inventory.updateStock(body);
    if(updatedProducts) {
      let orderSubmitted = await shopper.clearCart();

      if (orderSubmitted) {
        res.redirect('/thankyou');
      }
    }
  } catch (error) {
    console.error(error);
  }

  router.route('/thankyou').get((req, res) => {
    res.render('thankyou');
  });
  
});



router.route('/clear-orders').delete(async (req, res) => {
  const shopper = new Shopper();
  try {
    let ordersCleared = await shopper.clearOrders();
    res.json(ordersCleared);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
