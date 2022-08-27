const express = require('express');
const router = express.Router();

const PrividerController = require('../../controllers/ProviderController');
const controller = new PrividerController();


router.post('/checkEmailAndCell', controller.checkEmailAndCell.bind(controller));
router.post('/signup', controller.signUp.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/sendCode', controller.sendCode.bind(controller));
router.post('/forgetPassword', controller.forgetPassword.bind(controller));
router.post('/changePassword', controller.changePassword.bind(controller));

module.exports = router