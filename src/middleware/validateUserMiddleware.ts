import { body } from "express-validator";

export const validateUser = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("You must supply a password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .withMessage(
      "Password must be at least 8 characters long, contain at least one uppercase, one lowercase, one number and one special character"
    ),
];
