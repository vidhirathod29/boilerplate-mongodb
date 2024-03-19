const Joi = require('Joi');

function registrationValidation(req) {
  const schema = Joi.object().keys({
    firstName: Joi.string().empty().required().min(3).messages({
      'string.base': `Firstname should be type of 'string'`,
      'string.empty': `Firstname should not be empty`,
      'any.required': `Firstname is required`,
    }),
    lastName: Joi.string().empty().required().min(3).messages({
      'string.base': `Lastname should be type of 'string'`,
      'string.empty': `Lastname should not be empty`,
      'any.required': `Lastname is required`,
    }),
    gender: Joi.string().empty().required().messages({
      'string.base': `Gender should be type of 'string'`,
      'string.empty': `Gender should not be empty`,
      'any.required': `Gender is required`,
    }),
    hobby: Joi.string().required().messages({
      'string.base': `Hobby should be type of 'string'`,
      'any.required': `Hobby is required`,
    }),
    city: Joi.string().empty().required().messages({
      'string.base': `City should be type of 'string'`,
      'string.empty': `City should not be empty`,
      'any.required': `City is required`,
    }),
    mobile: Joi.string().empty().required().messages({
      'string.base': `Mobile number should be type of 'number'`,
      'string.empty': `Mobile number should not be empty`,
      'any.required': `Mobile number is required`,
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
    password: Joi.string()
      .empty()
      .required()
      .min(5)
      .max(16)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `password is required`,
      }),
  });
  return schema.validate(req);
}

function loginValidation(req) {
  const schema = Joi.object({
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
  });
  return schema.validate(req);
}

function updateValidation(req) {
  const schema = Joi.object({
    firstName: Joi.string().empty().min(3).messages({
      'string.base': `Firstname should be type of 'string'`,
      'string.empty': `Firstname should not be empty`,
      'any.required': `Firstname is required`,
    }),
    lastName: Joi.string().empty().min(3).messages({
      'string.base': `Lastname should be type of 'string'`,
      'string.empty': `Lastname should not be empty`,
      'any.required': `Lastname is required`,
    }),
    gender: Joi.string().empty().messages({
      'string.base': `Gender should be type of 'string'`,
      'string.empty': `Gender should not be empty`,
      'any.required': `Gender is required`,
    }),
    hobby: Joi.string().empty().messages({
      'string.base': `Hobby should be type of 'string'`,
      'string.empty': `Hobby should not be empty`,
      'any.required': `Hobby is required`,
    }),
    city: Joi.string().empty().messages({
      'string.base': `City should be type of 'string'`,
      'string.empty': `City should not be empty`,
      'any.required': `City is required`,
    }),
    mobile: Joi.string().empty().messages({
      'string.base': `Mobile number should be type of 'number'`,
      'string.empty': `Mobile number should not be empty`,
      'any.required': `Mobile number is required`,
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
    password: Joi.string()
      .empty()
      .min(5)
      .max(16)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `password is required`,
      }),
  });
  return schema.validate(req);
}

function resetPasswordValidation(req) {
  const schema = Joi.object({
    oldPassword: Joi.string()
      .empty()
      .required()
      .min(5)
      .max(16)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `Old password is required`,
      }),
    newPassword: Joi.string()
      .empty()
      .required()
      .min(5)
      .max(16)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `New password is required`,
      }),
    cPassword: Joi.string()
      .empty()
      .valid(Joi.ref('newPassword'))
      .required()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `current password should be type of 'string'`,
        'string.empty': `current password should not be empty`,
        'any.only': `new password and confirm password should be same`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `Confirm password is required`,
      }),
  });
  return schema.validate(req);
}

function generateOtpValidation(req) {
  const schema = Joi.object({
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
  });
  return schema.validate(req);
}

function verifyOtpValidation(req) {
  const schema = Joi.object({
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
    otp: Joi.string().empty().required().min(6).messages({
      'string.base': `Otp should be type of 'string'`,
      'string.empty': `Otp should not be empty`,
      'string.min': `Otp should be atleast 6 digits `,
      'any.required': `Otp is required`,
    }),
  });
  return schema.validate(req);
}

function updatePasswordValidation(req) {
  const schema = Joi.object({
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
    updatedPassword: Joi.string()
      .empty()
      .required()
      .min(5)
      .max(16)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `password should be type of 'string'`,
        'string.empty': `password should not be empty`,
        'string.min': `password should be of minimum 5 characters`,
        'string.max': `password should be of maximum 16 characters`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `New password is required`,
      }),
    cPassword: Joi.string()
      .empty()
      .valid(Joi.ref('newPassword'))
      .required()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/])/,
      )
      .messages({
        'string.base': `current password should be type of 'string'`,
        'string.empty': `current password should not be empty`,
        'any.only': `new password and confirm password should be same`,
        'string.regex': `Password must contain atleast one uppercase alphabet, one lowercase alphabet and one special symbol`,
        'any.required': `Confirm password is required`,
      }),
  });
  return schema.validate(req);
}

module.exports = {
  registrationValidation,
  loginValidation,
  updateValidation,
  resetPasswordValidation,
  generateOtpValidation,
  verifyOtpValidation,
  updatePasswordValidation,
};
