const express = require('express');
const router = express();
const upload = require('../services/multer');
const auth = require('../helper/authenticate');
const controller = require('../controller/portfolioController');

router.post(
  '/addPortfolio',
  auth.authentication,
  upload.array('projectImage', 5),
  controller.addPortfolio,
);
router.get('/viewPortfolio', auth.authentication, controller.viewPortfolio);

router.put(
  '/updatePortfolio/:id',
  auth.authentication,
  upload.array('projectImage', 5),
  controller.updatePortfolio,
);

router.delete(
  '/deletePortfolio/:id',
  auth.authentication,
  controller.deletePortfolio,
);

router.delete(
  '/deleteMultiplePortfolio/:id',
  auth.authentication,
  controller.deleteMultiplePortfolio,
);
module.exports = router;
