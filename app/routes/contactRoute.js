const express = require('express');
const router = express();
const auth = require('../helper/authenticate');
const controller = require('../controller/contactController');

router.post('/addContact',auth.authentication,controller.addContact);


module.exports=router;