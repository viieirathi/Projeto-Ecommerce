import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().required().min(12).empty(''),
  password: joi.string().required().min(6).empty(''),
  email: joi.string().email().required().empty(''),
  role: joi.string().required().empty(''),
  image: joi.string().required().empty(''),
});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, password, email, role, image,
    } = req.body;
    const { error } = userSchema.validate({
      name,
      password,
      email,
      role,
      image,
    });
    if (error) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: error.details[0].message });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export default validateUser;
