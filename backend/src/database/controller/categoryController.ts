import { Request, Response, NextFunction } from 'express';
import services from '../service/categoryService';

const categoryCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name_category,
      isvalidToken: { role },
    } = req.body;

    const { code, data } = await services.categoryServiceCreate({ name_category, role });
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

export default { categoryCreateController };
