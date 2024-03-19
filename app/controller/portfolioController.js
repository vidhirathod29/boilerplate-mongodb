const { portfolioModel } = require('../helper/portfolioModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const validate = require('../validation/portfolioValidation');

const addPortfolio = async (req, res, next) => {
  try {
    const email = req.user.email;

    const {
      projectCategory,
      projectName,
      projectTitle,
      date,
      projectDescription,
    } = req.body;

    const { error } = await validate.addPortfolioValidation(req.body);
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

    const newPortfolio = new portfolioModel({
      projectCategory,
      projectName,
      projectImage: req.files.map((file) => file.originalname),
      projectTitle,
      date,
      projectDescription,
    });

    const portfolio = await newPortfolio.save();

    if (portfolio) {
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
        `${Messages.SOMETHING_WENT_WRONG} while adding portfolio`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const viewPortfolio = async (req, res, next) => {
  try {
    const portfolioData = await portfolioModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'projectCategory',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $project: {
          _id: 1,
          projectCategory: 1,
          projectName: 1,
          projectImage: 1,
          projectTitle: 1,
          date: 1,
          projectDescription: 1,
          categoryName: '$categoryDetails.categoryName',
        },
      },
    ]);
    if (portfolioData) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Portfolio obtained ${Messages.SUCCESS}`,
            portfolioData,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Portfolio ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while obtaining portfolio`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const updatePortfolio = async (req, res, next) => {
  try {
    const email = req.user.email;
    const {
      projectCategory,
      projectName,
      projectTitle,
      date,
      projectDescription,
    } = req.body;

    const { error } = await validate.updatePortfolioValidation(req.body);
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

    const image = req.files.map((image) => image.filename);
    const updatePortfolio = await portfolioModel.findByIdAndUpdate(
      req.params.id,
      {
        projectCategory,
        projectName,
        projectImage: image,
        projectTitle,
        date,
        projectDescription,
      },
    );

    if (updatePortfolio) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Portfolio updated ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Portfolio id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while updating portfolio`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};
const deletePortfolio = async (req, res, next) => {
  try {
    const email = req.user.email;
    const deletePortfolio = await portfolioModel.findByIdAndDelete(
      req.params.id,
    );
    if (deletePortfolio.deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Portfolio deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Portfolio id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting portfolio`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteMultiplePortfolio = async (req, res, next) => {
  try {
    const ids = req.params.id;
    const idArray = ids.split(',');

    let deletedCount = 0;

    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      await portfolioModel.findByIdAndDelete(id);
      deletedCount++;
    }

    if (deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Portfolio deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Portfolio id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting multiple portfolios`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  addPortfolio,
  viewPortfolio,
  updatePortfolio,
  deletePortfolio,
  deleteMultiplePortfolio,
};
