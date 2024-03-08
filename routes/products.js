const express= require('express');
const router= express.Router();
const productsController= require('../controllers/products');
const category= 'Cars' || 'Appliances' || 'Clothes' || 'Books';

const bodyParser= require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//Appliances"},{"id":2,"name":"Cars"},{"id":3,"name":"Clothes"},{"id":4,"name":"Books"},{"id":5,"name":"Shoes"}]
router.get(`/products/:category`, productsController.getAllProducts);
router.get(`/products/:category/:id`, productsController.getOneProduct);

router.post('/products/:category', productsController.createProduct); 
router.delete('/products/:category/:id', productsController.deleteProduct);
router.put('/products/:category/:id', productsController.updateProduct); 

module.exports = router; // export to use in server.js