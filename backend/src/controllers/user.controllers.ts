import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(200).send({ message: "User registered successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong !" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid Credentials !" });

    const validPassword = await compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials !" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    //* clearing the old cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    //* sending the updated one
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(200).json({userId: user._id});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"})
  }
};
