const Joi = require('Joi');

function addCategoryValidation(req) {
  const schema = Joi.object().keys({
    categoryName: Joi.string().required().empty().messages({
      'string.base': `Category name should be type of String`,
      'string.empty': `Category name should not be empty`,
      'any.required': `Category name is required`,
    }),
  });
  return schema.validate(req);
}

function updateCategoryValidation(req) {
  const schema = Joi.object().keys({
    categoryName: Joi.string().required().empty().messages({
      'string.base': `Category name should be type of String`,
      'string.empty': `Category name should not be empty`,
      'any.required': `Category name is required`,
    }),
  });
  return schema.validate(req);
}

module.exports = {
  addCategoryValidation,
  updateCategoryValidation,
};
