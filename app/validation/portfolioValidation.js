const Joi = require('joi');

function addPortfolioValidation(req) {
  const schema = Joi.object().keys({
    projectCategory: Joi.string().required().empty().messages({
      'string.base': 'Project category should be type of string',
      'string.empty': 'Project category should not be empty',
      'any.required': 'Project category is  required ',
    }),
    projectName: Joi.string().required().empty().messages({
      'string.base': 'Project name should be type of string',
      'string.empty': 'Project name should not be empty',
      'any.required': 'Project name is  required ',
    }),
    projectTitle: Joi.string().required().empty().messages({
      'string.base': 'Project title should be type of string',
      'string.empty': 'Project title should not be empty',
      'any.required': 'Project title is  required ',
    }),
    date: Joi.date().default(new Date(Date.now())),
    projectDescription: Joi.string().required().empty().messages({
      'string.base': 'Project description should be type of string',
      'string.empty': 'Project description should not be empty',
      'any.required': 'Project description is  required ',
    }),
  });
  return schema.validate(req);
}

function updatePortfolioValidation(req) {
  const schema = Joi.object().keys({
    projectCategory: Joi.string().empty().messages({
      'string.base': 'Project category should be type of string',
      'string.empty': 'Project category should not be empty',
      'any.required': 'Project category is  required ',
    }),
    projectName: Joi.string().empty().messages({
      'string.base': 'Project name should be type of string',
      'string.empty': 'Project name should not be empty',
      'any.required': 'Project name is  required ',
    }),
    projectTitle: Joi.string().empty().messages({
      'string.base': 'Project title should be type of string',
      'string.empty': 'Project title should not be empty',
      'any.required': 'Project title is  required ',
    }),
    date: Joi.date().default(new Date(Date.now())),
    projectDescription: Joi.string().empty().messages({
      'string.base': 'Project description should be type of string',
      'string.empty': 'Project description should not be empty',
      'any.required': 'Project description is  required ',
    }),
  });
  return schema.validate(req);
}

module.exports = {
  addPortfolioValidation,
  updatePortfolioValidation,
};
