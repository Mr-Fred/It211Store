const express = require('express');
const router = express.Router();
const Shopper = require('../controllers/shopper.js')

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
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
});

router.route('/cart/addtocart').post(async (req, res) => {

  const shopper = new Shopper();
  const body = req.body;

  try {
    const addedToCart = await shopper.addToCart(body);
    res.status(200).json(addedToCart);
  } catch (error) {
    console.error(error);
  }
});

router.route('/cart').get( async (req, res) => {
  const shopper = new Shopper();
  try {
    let cartItems = await shopper.readCart();
    res.status(200).json(cartItems);
    
  } catch (error) {
    console.error(error);
  }

});

router.route('/cart/:prod_id').delete( async (req, res) => {
  const shopper = await new Shopper();
  
  try {
    let deletedProduct = await shopper.removeProd(req.params.prod_id);
    console.log(deletedProduct)
    res.json(deletedProduct);
  } catch (error) {
    console.log(error)
  }
  
});

router.route('/checkout').post(async (req, res) => {
  const shopper = new Shopper();

  try {
      let orderSummary = await shopper.checkout();
      res.json(orderSummary);
  } catch (error) {
    throw error
  }

  // try {
  //   let carts = await shopper.readCart();
  //   let total = await shopper.getTotal(carts);
  //   console.log(total)
  // } catch (error) {
  //   throw error
  // }
  
})


module.exports = router;