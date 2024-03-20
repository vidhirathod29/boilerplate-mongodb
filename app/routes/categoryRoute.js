const express = require('express');
const router = express();
const auth = require('../helper/authenticate');
const controller = require('../controller/categoryController');

router.post('/addCategory', auth.authentication, controller.addCategory);
router.get('/viewCategory', auth.authentication, controller.viewCategory);
router.put('/updateCategory/:id', auth.authentication, controller.updateCategory);
router.delete(
  '/deleteCategory/:id',
  auth.authentication,
  controller.deleteCategory,
);
router.delete('/deleteMultipleCategory/:id',auth.authentication,controller.deleteMultipleCategory);
module.exports = router;
