import { NextFunction, Request, Response } from "express";
import { userServiceCreate, userServiceLogin } from "../service/userService";
import * as bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";

const userCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, role, image } = req.body;
    bcryptjs.genSalt(10, async (err, salt) => {
      bcryptjs.hash(password, salt, async (err, hash) => {
        const newUser = {
          name,
          password: hash,
          email,
          role,
          image,
        };
        const { code, data } = await userServiceCreate(newUser);
        return res.status(code).json(data);
      });
    });
  } catch (error) {
    next(error);
  }
};

const userLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const {code, data} = await userServiceLogin({ email, password });
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

export { userCreateController, userLoginController };
