const { testimonialModel } = require('../helper/testimonialModel');
const StatusCodes = require('../services/Http-Status');
const { GeneralResponse } = require('../utils/response');
const { GeneralError } = require('../utils/error');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const validate = require('../validation/testimonialValidation');

const addTestimonial = async (req, res, next) => {
  try {
    const email = req.user.email;

    const { testimonialName, designation, testimonialDescription } = req.body;

    const { error } = await validate.addTestimonialValidation(req.body);
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

    const newTestimonial = new testimonialModel({
      testimonialName,
      designation,
      testimonialDescription,
      image: req.file.filename,
    });

    const testimonial = await newTestimonial.save();

    if (testimonial) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Testimonial added ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `${Messages.FAILED} to add testimonial`,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while adding testimonial`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const viewTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialModel.find();
    if (testimonial) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            `Testimonial obtained ${Messages.SUCCESS}`,
            testimonial,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Testimonial ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while obtaining testimonial`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const email = req.user.email;

    const { testimonialName, designation, testimonialDescription } = req.body;

    const { error } = await validate.updateTestimonialValidation(req.body);
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

    const updateTestimonial = await testimonialModel.findByIdAndUpdate(
      req.params.id,
      {
        testimonialName,
        designation,
        testimonialDescription,
        image: req.file.filename,
      },
    );
    if (updateTestimonial) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Testimonial updated ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Testimonial id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while updating testimonial`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const email = req.user.email;
    const deleteTestimonial = await testimonialModel.findByIdAndDelete(
      req.params.id,
    );
    if (deleteTestimonial) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Testimonial deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Testimonial id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting testimonial`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteMultipleTestimonials = async (req, res, next) => {
  try {
    const ids = req.params.id;
    const idArray = ids.split(',');

    let deletedCount = 0;

    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      await testimonialModel.findByIdAndDelete(id);
      deletedCount++;
    }

    if (deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new GeneralResponse(
            ` Testimonial deleted ${Messages.SUCCESS}`,
            undefined,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
    } else {
      next(
        new GeneralError(
          `Testimonial id ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } catch (error) {
    return next(
      new GeneralError(
        `${Messages.SOMETHING_WENT_WRONG} while deleting multiple testimonials`,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  addTestimonial,
  viewTestimonial,
  updateTestimonial,
  deleteTestimonial,
  deleteMultipleTestimonials,
};
