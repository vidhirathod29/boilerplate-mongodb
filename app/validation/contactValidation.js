const Joi = require('joi');

function addContactValidation(req) {
  const schema = Joi.object().keys({
    contactName: Joi.string().empty().required().messages({
      'string.base': `Contact name should be a type of 'string'`,
      'string.empty': `Contact name can not an empty field`,
      'any.required': `Contact name is a required field`,
    }),
    email: Joi.string()
      .empty()
      .required()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be type of 'string'`,
        'string.empty': `Email should not be empty`,
        'string.regex': `Email should be in proper formate`,
        'any.required': `Email is required`,
      }),
    contactNumber: Joi.string().empty().required().messages({
      'string.base': `Contact number should be type of 'number'`,
      'string.empty': `Contact number should not be empty`,
      'any.required': `Contact number is required`,
    }),
    messages: Joi.string().required().empty().messages({
      'string.base': ` messages should be choose`,
      'string.empty': ` messages can not an empty field`,
      'any.required': ` messages is a required field`,
    }),
    date: Joi.date().required().messages({
      'any.required': `date is a required field`,
    }),
  });
  return schema.validate(req);
}

module.exports={
    addContactValidation
}