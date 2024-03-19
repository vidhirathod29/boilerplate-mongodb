const { authModel } = require('../helper/auth');
const { otpModel } = require('../helper/otpModel');
const bcrypt = require('bcrypt');
const validation = require('../validation/authValidation');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const { generateToken } = require('../helper/authenticate');
const { otpSend } = require('../services/mail');

const registration = async (req, res, next) => {
  try {
    const { error } = validation.registrationValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const encrypt = await bcrypt.hash(req.body.password, 10);
    const existingUser = await authModel.findOne({ email: req.body.email });

    if (existingUser) {
      next(
        new GeneralResponse(
          `This email ID ${Messages.ALREADY_EXIST}`,
          undefined,
          StatusCodes.FORBIDDEN,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    const newUser = new authModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      hobby: req.body.hobby,
      city: req.body.city,
      mobile: req.body.mobile,
      email: req.body.email,
      password: encrypt,
      image: req.file.filename,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      next(
        new GeneralResponse(
          `User registration ${Messages.FAILED}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    next(
      new GeneralResponse(
        `Congratulation! You have registered`,
        undefined,
        StatusCodes.CREATED,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } catch (err) {
    next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG}`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const login = async (req, res, next) => {
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send('Error');
  const response = await authModel.findOne({ email: req.body.email });
  if (response) {
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      response.password,
    );
    if (passwordCompare === true) {
      const token = generateToken(req.body.email, req.body.password);
      next(
        new GeneralResponse(
          `You have logged in ${Messages.SUCCESS}`,
          token,
          StatusCodes.OK,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    } else {
      next(
        new GeneralResponse(
          `Data ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } else {
    next(
      new GeneralResponse(
        `User ${Messages.NOT_FOUND}`,
        undefined,
        StatusCodes.NOT_FOUND,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const viewProfile = async (req, res, next) => {
  try {
    const email = req.user.email;
    const user = await authModel.findOne({ email: email });
    if (user) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Your Profile has been get ${Messages.SUCCESS}`,
            user,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralResponse(
          `User Profile ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG}`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateProfile = async (req, res, next) => {
  const email = req.user.email;
  const { error } = validation.updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const email = req.body.email;
    const updateProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      hobby: req.body.hobby,
      mobile: req.body.mobile,
      email: req.body.email,
      city: req.body.city,
      image: req.file.filename,
    };
    const userUpdate = await authModel.updateOne({ email }, updateProfile);
    if (userUpdate.modifiedCount > 0) {
      return res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Your Profile has been updated ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      return next(
        new GeneralResponse(
          `User Profile ${Messages.FAILED} to update`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    return next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG} while updating the profile`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const resetPassword = async (req, res, next) => {
  const { error } = validation.resetPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const email = req.user.email;
    const data = await authModel.findOne({ email });
    if (data) {
      const comparePassword = await bcrypt.compare(
        req.body.oldPassword,
        data.password,
      );
      if (comparePassword) {
        const newPassword = await bcrypt.hash(req.body.newPassword, 10);
        const newPass = await authModel.updateOne(
          { email },
          { password: newPassword },
        );
        if (newPass) {
          return res
            .status(StatusCodes.OK)
            .json(
              new GeneralResponse(
                `Password changed ${Messages.SUCCESS}`,
                undefined,
                undefined,
                RESPONSE_STATUS.SUCCESS,
              ),
            );
        } else {
          return next(
            new GeneralResponse(
              `Password and confirm password ${Messages.IS_DIFFERENT}`,
              undefined,
              StatusCodes.NOT_FOUND,
              RESPONSE_STATUS.ERROR,
            ),
          );
        }
      } else {
        return next(
          new GeneralResponse(
            `Old password ${Messages.NOT_FOUND}`,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    } else {
      return next(
        new GeneralResponse(
          `User ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    return next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG}`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const otpSendEmail = async (req, res, next) => {
  const { error } = validation.generateOtpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const emailId = req.body.email;
    const user = await authModel.findOne({ email: req.body.email });
    const generateOtp = Math.floor(100000 + Math.random() * 900000);
    console.log(generateOtp);
    if (user) {
      const newOtp = new otpModel({
        email: emailId,
        otp: generateOtp,
      });
      console.log(newOtp);

      const newOtpGenerated = await newOtp.save();

      otpSend(emailId, generateOtp);
      if (newOtpGenerated) {
        return res
          .status(StatusCodes.OK)
          .json(
            new GeneralResponse(
              `OTP generated ${Messages.SUCCESS}`,
              undefined,
              undefined,
              RESPONSE_STATUS.SUCCESS,
            ),
          );
      } else {
        return next(
          new GeneralResponse(
            `${Messages.FAILED} to Generate OTP`,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    } else {
      return next(
        new GeneralResponse(
          `User ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    return next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG} while generating OTP`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const otpVerification = async (req, res, next) => {
  const { error } = validation.verifyOtpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const email = req.body.otp;
    const otp = req.body.otp;
    const verifyOtp = await otpModel.findOne({ email: email, otp: otp });
    if (verifyOtp) {
      return res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `OTP verified ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      return next(
        new GeneralResponse(
          'Please enter a valid OTP',
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    return next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG} while verifying OTP`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await authModel.findOne({ email });
    if (user) {
      const updatePassword = await bcrypt.hash(req.body.updatePassword, 10);
      const updatePass = await authModel.updateOne(
        { email },
        { password: updatePassword },
      );
      if (updatePass) {
        return res
          .status(StatusCodes.OK)
          .json(
            new GeneralResponse(
              `Password updated ${Messages.SUCCESS}`,
              undefined,
              undefined,
              RESPONSE_STATUS.SUCCESS,
            ),
          );
      } else {
        return next(
          new GeneralResponse(
            'Error occur while updating the password',
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    } else {
      return next(
        new GeneralResponse(
          `${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (err) {
    return next(
      new GeneralResponse(
        `${Messages.SOMETHING_WENT_WRONG} while updating password`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  registration,
  updateProfile,
  viewProfile,
  login,
  resetPassword,
  otpSendEmail,
  otpVerification,
  updatePassword,
};
