const { categoryModel } = require('../helper/categoryModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const validate = require('../validation/categoryValidation');
const addCategory = async (req, res, next) => {
  try {
    const { error } = validate.addCategoryValidation(req.body);
    const { categoryName } = req.body;
    if (error)
      return res
        .status(400)
        .json(
          new GeneralError(
            `${Messages.BAD_REQUEST}`,
            StatusCodes.BAD_REQUEST,
            error.message,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    const newCategory = new categoryModel({
      categoryName,
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
          `${Messages.FAILED} to add category`,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while adding category`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const viewCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find();

    if (category) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Categories get ${Messages.SUCCESS}`,
            category,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Category ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        Messages.SOMETHING_WENT_WRONG,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const { error } = validate.updateCategoryValidation(req.body);
    if (error) {
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
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName,
      },
    );

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
          `${Messages.FAILED} to update category`,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while updating category`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
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
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting category`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteMultipleCategory = async (req, res, next) => {
  try {
    const ids = req.params.id;
    const idArray = ids.split(',');

    let deletedCount = 0;

    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      await categoryModel.findByIdAndDelete(id);
      deletedCount++;
    }

    if (deletedCount > 0) {
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
          `Category id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting multiple categories`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
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
  deleteMultipleCategory,
};
