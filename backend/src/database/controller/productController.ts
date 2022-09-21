import { NextFunction, Request, Response } from 'express';
import { productServiceCreate, productServiceGetAll } from '../service/productServices';

const productCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name_product, quantity, price, category, image, isvalidToken,
    } = req.body;
    const { id } = isvalidToken;
    const { code, data } = await productServiceCreate({
      name_product,
      quantity,
      price,
      image,
      id_user: id,
      name_category: category,
    });
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const productGetAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await productServiceGetAll();
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

export { productCreateController, productGetAllController };
