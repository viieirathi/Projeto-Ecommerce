import { verifyToken, SECRET } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token não encontrado" });
    const isvalidToken = verifyToken(token, SECRET);
    req.body = { ...req.body, isvalidToken };
    if (!isvalidToken)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token inválido" });
    next();
  } catch (error) {
    if (error.name.includes("Token"))
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token Inválido",
      });
  }
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token não encontrado" });
    const { role } = verifyToken(authorization, SECRET);
    return res.status(StatusCodes.OK).json(role);
    next();
  } catch (error) {
    if (error.name.includes("Token"))
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token Inválido" });
  }
};

export { authenticateToken, validateToken };
