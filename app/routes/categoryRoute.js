const express = require('express');
const router = express();
const categoryController = require('../controller/categoryController')


router.post('/addCategory',categoryController.addCategory);
module.exports= router;