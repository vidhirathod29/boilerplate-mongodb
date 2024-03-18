//const statusResponse = require('./enum');
const { string, any, number } = require('joi');
const RESPONSE_STATUS = require('../utils/enum');
module.exports = {
  successResponse: (statusCodes, status, message, data, error) => {
    res.status(200).json({
      statusCode: number,
      status: string,
      message: string,
      data: any,
      error: null,
    });
  },

  errorResponse: (statusCodes, status, message, data, error) => {
    res.status(500).json({
      statusCode: number,
      status: string,
      message: string,
      data: any,
      error: errorMessage,
    });
  },
};
