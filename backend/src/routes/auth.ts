import express, { Request, Response } from "express";
import { userLogin } from "../controllers/user.controllers";
import { loginValidator, validate } from "../middleware/validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/login", validate(loginValidator), userLogin);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

//* invalidated the token
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
