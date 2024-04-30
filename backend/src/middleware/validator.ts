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

// export const hotelFormValidator = [
//   body("name").notEmpty().withMessage("Name is required"),
//   body("city").notEmpty().withMessage("City is required"),
//   body("country").notEmpty().withMessage("Country is required"),
//   body("description").notEmpty().withMessage("Description is required"),
//   body("type").notEmpty().withMessage("Hotel type is required"),
//   body("pricePerNight")
//     .notEmpty()
//     .isNumeric()
//     .withMessage("Price per night is required and must be a number"),
//   body("facilities")
//     .notEmpty()
//     .isArray()
//     .withMessage("Facilities are required"),
// ];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break; // * if validation fails it'll throw some errors therefore result will be non-empty
    }

    const errors = validationResult(req); //* gathers any errors in an array
    if (errors.isEmpty()) return next(); //* if no error proceed to next middleware function

    // console.log(errors);
    return res.status(422).json({ errors: errors.array() }); //* 422 unprocessable entity
  };
};
