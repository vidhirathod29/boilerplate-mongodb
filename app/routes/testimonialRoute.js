const express = require('express');
const router = express();
const upload = require('../services/multer');
const auth = require('../helper/authenticate');
const controller = require('../controller/testimonialController');

router.post(
  '/addTestimonial',
  auth.authentication,
  upload.single('image'),
  controller.addTestimonial,
);
router.get('/viewTestimonial',auth.authentication,controller.viewTestimonial);
router.put('/updateTestimonial/:id',auth.authentication,upload.single('image'),controller.updateTestimonial);
router.delete('/deleteTestimonial/:id',auth.authentication,controller.deleteTestimonial);
router.delete('/deleteMultipleTestimonials/:id',auth.authentication,controller.deleteMultipleTestimonials);
module.exports = router;
