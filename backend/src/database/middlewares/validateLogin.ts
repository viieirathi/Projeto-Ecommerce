import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email().required().empty(""),
    password: joi.string().required().min(6).empty(""),
});

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const { error } = loginSchema.validate({
            email, password
        });
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message })
        }
        next()
    } catch (error) {
        next(error)
    }
}


export default loginValidate
