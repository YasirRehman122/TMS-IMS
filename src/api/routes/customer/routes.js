const express = require('express');
const router = express.Router();
const Authentication = require('../../middlewares/Authentication');

const CustomerController = require('../../controllers/CustomerController');
const controller = new CustomerController();

// All the routes for customer is here
router.post('/checkEmailAndCell', controller.checkEmailAndCell.bind(controller));
router.post('/signup', controller.signUp.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/sendCode', controller.sendCode.bind(controller));
router.post('/forgetPassword', controller.forgetPassword.bind(controller));
router.post('/changePassword', Authentication, controller.changePassword.bind(controller));
router.put('/update', Authentication, controller.updateProfile.bind(controller));
router.get('/:id', Authentication, controller.getUserById.bind(controller));


module.exports = router