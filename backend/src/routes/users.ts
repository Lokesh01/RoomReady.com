import express from "express";
import { registerUser } from "../controllers/user.controllers";
import { signUpValidator, validate } from "../middleware/validator";

const router = express.Router();

router.post("/register", validate(signUpValidator), registerUser);

export default router;
