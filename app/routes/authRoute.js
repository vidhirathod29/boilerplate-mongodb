const multer = require('multer');
const express = require('express');
const router = express.Router();
const { authModel } = require('../helper/auth');
const { otpModel } = require('../helper/otpModel');
const controller = require('../controller/authController');
const upload = require('../services/multer');
const auth = require('../helper/authenticate');
const validate = require('../validation/authValidation');

router.post('/registration', upload.single('image'), controller.registration);
router.put(
  '/updateprofile',
  auth.authentication,
  upload.single('image'),
  controller.updateProfile,
);
router.get('/viewprofile', auth.authentication, controller.viewProfile);
router.post('/login', auth.generateToken, controller.login);
router.put('/resetpassword', auth.authentication, controller.resetPassword);
router.post('/otpsend', controller.otpSendEmail);
router.post('/otpverify', controller.otpVerification);
router.put('/updatepassword', controller.updatePassword);

module.exports = router;
