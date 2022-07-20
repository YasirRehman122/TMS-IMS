const express = require('express');
const router = express.Router();

const CustomerController = require('../../controllers/CustomerController');
const controller = new CustomerController();


router.post('/checkEmailAndCell', controller.checkEmailAndCell.bind(controller));
router.post('/signup', controller.signUp.bind(controller));


module.exports = router