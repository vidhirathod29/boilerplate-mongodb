const { contactModel } = require('../helper/contactModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const validate = require('../validation/contactValidation');

const addContact = async (req, res, next) => {
  try {
    const { error } = validate.addContactValidation(req.body);
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
    const { contactName, email, contactNumber, date, messages } = req.body;

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
            `Contact added ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `${Messages.FAILED} to add contact`,
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

const viewContact = async (req, res, next) => {
  try {
    const contact = await contactModel.find();
    if (contact) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Contact obtain ${Messages.SUCCESS}`,
            contact,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Contact ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while obtaining contact`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = validate.updateContactValidation(req.body);
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
    const { contactName, email, contactNumber, date, messages } = req.body;

    const updateContact = await contactModel.findByIdAndUpdate(req.params.id, {
      contactName,
      email,
      contactNumber,
      date,
      messages,
    });
    if (updateContact) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Contact updated ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Contact ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while updating contact`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const deleteContact = await contactModel.findByIdAndDelete(req.params.id);
    if (deleteContact) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Contact deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Contact id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting contact`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteMultipleContact = async (req, res, next) => {
  try {
    const ids = req.params.id;
    const idArray = ids.split(',');
    let deletedCount = 0;
    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      await contactModel.findByIdAndDelete(id);
      deletedCount++;
    }
    if (deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Contacts deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Contacts id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting multiple contacts`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
module.exports = {
  addContact,
  viewContact,
  updateContact,
  deleteContact,
  deleteMultipleContact,
};
