const express = require('express');
const router = express.Router();

const CustomerController = require('../../controllers/CustomerController');
const controller = new CustomerController();


router.post('/checkEmail', controller.checkEmail.bind(controller));
router.post('/signup', controller.signUp.bind(controller));


module.exports = router