const express = require('express');
const router = express.Router();
const Inventory = require('../controllers/inventory.js');

router.route('/addProduct').get(async (req, res) => {
  res.render('create');
});

router.route('/addproduct').post(async (req, res) => {
  const inventory = new Inventory(req.body);
  try {
    const savedProd = await inventory.addProd();
    res.redirect('/');
    
  } catch (error) {
    res.status(500).json({error: 'Error creating product'});
  }
});


router.route('/product/:prod_id').put(async (req, res) => {
  const inventory = new Inventory(req.body);
  const prod_id = req.params.prod_id;

  try {
    let updatedProduct = await inventory.updateProduct(prod_id);
    res.json(updatedProduct);
  } catch (error) {
    throw error;
  }
  
});

router.route('/product/:prod_id').delete(async (req, res) => {
  const inventory = new Inventory(req.body);
  const prod_id = req.params.prod_id;
  
  try {
    let deletedProduct = await inventory.deleteProduct(prod_id);
    res.json(deletedProduct);
  } catch (error) {
    throw error;
  }
});
                                      
module.exports = router;