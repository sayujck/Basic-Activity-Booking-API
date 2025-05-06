import { body } from "express-validator";

export const registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
