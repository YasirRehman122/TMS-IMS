const express = require('express');
const router = express.Router();

const CustomerController = require('../../controllers/CustomerController');
const controller = new CustomerController();


router.post('/checkEmailAndCell', controller.checkEmailAndCell.bind(controller));
router.post('/signup', controller.signUp.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/sendCode', controller.sendCode.bind(controller));
router.post('/forgetPassword', controller.forgetPassword.bind(controller));


module.exports = router