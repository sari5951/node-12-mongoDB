const express= require('express');
const router= express.Router();
const categoriesController= require('../controllers/categories');
const bodyParser= require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getOneCategory)
router.post('/categories', categoriesController.newCategory); 
router.delete('/categories/:id', categoriesController.deleteOneCategory);
router.put('/categories/:id', categoriesController.changeCategory); 



module.exports = router; // export to use in server.js
//get-http://localhost:3000/categories/1
//delete-http://localhost:3000/categories/1
