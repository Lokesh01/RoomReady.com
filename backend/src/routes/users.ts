import express from "express";
import { getUserDetails, registerUser } from "../controllers/user.controllers";
import { signUpValidator, validate } from "../middleware/validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me",verifyToken,getUserDetails);

router.post("/register", validate(signUpValidator), registerUser);

export default router;
