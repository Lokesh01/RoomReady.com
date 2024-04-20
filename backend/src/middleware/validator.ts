import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Incorrect format for email"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Incorrect format for password"),
];

export const signUpValidator = [
  body("firstName").notEmpty().isString().withMessage("First Name is required"),
  body("lastName").notEmpty().isString().withMessage("Last Name is required"),
  ...loginValidator,
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break; // * if validation fails it'll throw some errors therefore result will be non-empty
    }

    const errors = validationResult(req); //* gathers any errors in an array
    if (errors.isEmpty()) return next(); //* if no error proceed to next middleware function

    return res.status(422).json({ errors: errors.array() }); //* 422 unprocessable entity
  };
};
