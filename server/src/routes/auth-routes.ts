import { Router, type Request, type Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  return res.json({ token });
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
      return res
        .status(401)
        .json({ message: "User already exists, please login" });
    }

    await User.create({ email, username, password });

    const secretKey = process.env.JWT_SECRET_KEY || "";

    const token = jwt.sign({ username, email }, secretKey, { expiresIn: "1h" });
    return res.json({ token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);
router.post("/signup", signup);

export default router;
