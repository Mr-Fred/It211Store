const express = require('express');
const router = express.Router();
const multer = require('multer');
const Inventory = require('../controllers/inventory.js');
const storageHandlers = require('../controllers/storageHandlers.js');


const storage = multer.diskStorage({
  destination: storageHandlers.uploadsDestHandler,
  filename: storageHandlers.uploadsFilenameHandler
});


const upload = multer({storage: storage});

router.route('/addProduct').get(async (req, res) => {
  res.render('create');
});

router.route('/addproduct').post(upload.none('image_url'), async (req, res) => {
  
  try {
    // let productDoc = req.body;
    // productDoc.image = req.file.path;
    
    const inventory = new Inventory(req.body);
    await inventory.addProd();
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

router.route('/product/:prod_id').post(async (req, res) => {
  const inventory = new Inventory(req.body);
  const prod_id = req.params.prod_id;
  
  try {
    let deletedProduct = await inventory.deleteProduct(prod_id);
    res.redirect('/');
  } catch (error) {
    throw error;
  }
});
                                      
module.exports = router;  