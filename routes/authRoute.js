import express from "express";
import { login, register } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../middlewares/authValidator.js";

const authRouter = new express.Router();

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", loginValidation, login);

export default authRouter;