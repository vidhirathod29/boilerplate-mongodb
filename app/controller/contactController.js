const { contactModel } = require('../helper/contactModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const validate = require('../validation/contactValidation');

const addContact = async (req, res, next) => {
  try {
    email = req.user.email;
    const { contactName, email, contactNumber, date, messages } = req.body;
    const { error } = await validate.addContactValidation(req.body);
    if (error)
      return res
        .status(400)
        .json(
          new GeneralError(
            `${Messages.BAD_REQUEST}`,
            StatusCodes.BAD_REQUEST,
            error.message,
            RESPONSE_STATUS.ERROR,
          ),
        );
    const newContact = new contactModel({
      contactName,
      email,
      contactNumber,
      date,
      messages,
    });
    const contact = await newContact.save();
    if (contact) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Portfolio added ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `${Messages.FAILED} to add portfolio`,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while adding contact`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
module.exports=
{
    addContact
}