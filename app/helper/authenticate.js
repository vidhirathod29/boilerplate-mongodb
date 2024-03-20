const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger/logger');
const { GeneralResponse } = require('../utils/response');
const StatusCodes = require('../services/Http-Status');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');

const generateToken = (req, res) => {
  const token = jwt.sign(
    { email: req.body.email, password: req.body.password },
    process.env.PRIVATE_KEY,
    {
      expiresIn: '1h',
    },
  );
  res.json({ token });
};
const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) {
        logger.error(err);
        next(
          new GeneralResponse(
            'Token verification failed',
            undefined,
            StatusCodes.UNAUTHORIZED,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      req.user = user;
      next();
    });
  } else {
    next(
      new GeneralResponse(
        `Token ${Messages.NOT_FOUND}`,
        undefined,
        StatusCodes.NOT_FOUND,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
module.exports = {
  generateToken,
  authentication,
};
