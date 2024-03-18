const express = require('express');
const router = express();
const auth = require('../helper/authenticate');
const controller = require('../controller/categoryController');

router.post('/addCategory', auth.authentication, controller.addCategory);
router.get('/viewCategory', auth.authentication, controller.viewCategory);
router.put('/updateCategory', auth.authentication, controller.updateCategory);
router.delete(
  '/deleteCategory',
  auth.authentication,
  controller.deleteCategory,
);

module.exports = router;
