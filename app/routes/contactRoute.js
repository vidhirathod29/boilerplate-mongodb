const express = require('express');
const router = express();
const auth = require('../helper/authenticate');
const controller = require('../controller/contactController');

router.post('/addContact', auth.authentication, controller.addContact);
router.get('/viewContact/', auth.authentication, controller.viewContact);
router.put('/updateContact/:id', auth.authentication, controller.updateContact);
router.delete(
  '/deleteContact/:id',
  auth.authentication,
  controller.deleteContact,
);
router.delete(
  '/deleteMultipleContacts/:id',
  auth.authentication,
  controller.deleteMultipleContact,
);

module.exports = router;
