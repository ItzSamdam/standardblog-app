const express = require('express');
const userRoute = express.Router();
const userController = require('../controller/userController');
const {addUserValidationMW} = require('../middleware/validation');


userRoute.post('/signup', addUserValidationMW, userController.signup);
userRoute.post('/login', userController.login)


module.exports = userRoute