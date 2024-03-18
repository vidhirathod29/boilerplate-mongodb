const { categoryModel } = require('../helper/categoryModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');

const validate = require('../validation/categoryValidation');
const addCategory = async (req, res, next) => {
  try {
    const email = req.user.email;

    const { error } = await validate.addCategoryValidation(req.body);

    if (error)
      return res
        .status(400)
        .json(
          new GeneralError(
            `${Messages.BAD_REQUEST}`,
            error.message,
            StatusCodes.BAD_REQUEST,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    const newCategory = new categoryModel({
      categoryName: req.body.categoryName,
    });

    const category = await newCategory.save();

    if (category) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Category added ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `${Messages.FAILED} to add Category`,
          undefined,
          StatusCodes.BAD_REQUEST,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while adding Category`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const viewCategory = async (req, res, next) => {
  try {
    const user = await categoryModel.find();

    if (user) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Categories get ${Messages.SUCCESS}`,
            user,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Category ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.NOT_FOUND,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        Messages.SOMETHING_WENT_WRONG,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const email = req.user.email;
    const { error } = await validate.updateCategoryValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          new GeneralError(
            `${Messages.BAD_REQUEST}`,
            error.message,
            StatusCodes.BAD_REQUEST,
            RESPONSE_STATUS.ERROR,
          ),
        );
    }

    const updatedCategory = await categoryModel.updateOne(req.params.id, {
      categoryName: req.body.categoryName,
    });

    if (updatedCategory) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Category updated ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `${Messages.FAILED} to update Category`,
          undefined,
          StatusCodes.BAD_REQUEST,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while updating Category`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const email = req.user.email;
    const { error } = await validate.updateCategoryValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          new GeneralError(
            `${Messages.BAD_REQUEST}`,
            error.message,
            StatusCodes.BAD_REQUEST,
            RESPONSE_STATUS.ERROR,
          ),
        );
    }
    const category = await categoryModel.deleteOne(req.params.id);
    if (category) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Category deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Category ${Messages.NOT_FOUND}`,
          undefined,
          StatusCodes.BAD_REQUEST,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting Category`,
        undefined,
        StatusCodes.INTERNAL_SERVER_ERROR,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  addCategory,
  viewCategory,
  updateCategory,
  deleteCategory,
};
