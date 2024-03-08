const router = require('express').Router();
const userController = require('../controllers/user.controller');
// const loggedIn = require("../helpers/auth.middleware");
// // Register a new User
// router.get('/authuseronly', loggedIn, userController.authuseronly);
router.post('/signUp', userController.signUp);

// Login
router.post('/login', userController.login);

module.exports = router;