import { NextFunction, Request, Response } from "express";
import { userServiceCreate } from "../service/userService";

const userCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, role, image } = req.body;
    const { code, data } = await userServiceCreate({
      name,
      password,
      email,
      role,
      image,
    });
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

export {
  userCreateController,
};
