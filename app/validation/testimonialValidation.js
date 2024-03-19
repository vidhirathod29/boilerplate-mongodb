const Joi = require('joi');

function addTestimonialValidation(req) {
    const schema = Joi.object().keys({
      testimonialName: Joi.string().required().empty().messages({
        'string.base': 'Testimonial name should be type of string',
        'string.empty': 'Testimonial name should not be empty',
        'any.required': 'Testimonial name is  required ',
      }),
      designation: Joi.string().required().empty().messages({
        'string.base': 'Testimonial designation should be type of string',
        'string.empty': 'Testimonial designation should not be empty',
        'any.required': 'Testimonial designation is  required ',
      }),
      testimonialDescription: Joi.string().required().empty().messages({
        'string.base': 'Testimonial description should be type of string',
        'string.empty': 'Testimonial description should not be empty',
        'any.required': 'Testimonial description is  required ',
      }),
    });
    return schema.validate(req);
  }

  function updateTestimonialValidation(req) {
    const schema = Joi.object().keys({
      testimonialName: Joi.string().empty().messages({
        'string.base': 'Testimonial name should be type of string',
        'string.empty': 'Testimonial name should not be empty',
        'any.required': 'Testimonial name is  required ',
      }),
      designation: Joi.string().empty().messages({
        'string.base': 'Testimonial designation should be type of string',
        'string.empty': 'Testimonial designation should not be empty',
        'any.required': 'Testimonial designation is  required ',
      }),
      testimonialDescription: Joi.string().empty().messages({
        'string.base': 'Testimonial description should be type of string',
        'string.empty': 'Testimonial description should not be empty',
        'any.required': 'Testimonial description is  required ',
      }),
    });
    return schema.validate(req);
  }
  module.exports={
    addTestimonialValidation,
    updateTestimonialValidation
  }