import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenBlacklist from "../models/blackList.model";
import { redis } from "../config/redis.config";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
/** 
 * Register controller --- handles user registration logic
 * post /api/auth/register
 */  
export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }


    const newUser: IUser = new User({ name, email, password });
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET!, { expiresIn: "3d" });
    await redis.set(`user:${newUser._id}`, token, { ex: 3 * 24 * 60 * 60 });
    await newUser.save();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(201).json({ message: "User registered successfully",user: { id: newUser._id, name: newUser.name, email: newUser.email } , token  });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
}

/** 
 * Login controller --- handles user login logic
 * post /api/auth/login
 */
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: "3d" });
    await redis.set(`user:${user._id}`, token, { ex: 3 * 24 * 60 * 60 });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

/** 
 * Logout controller --- handles user logout logic
 * post /api/auth/logout
 */
export const logout = async (req: any, res: any) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "You are not logged in" });
  } 
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET!);
    await redis.del(`user:${decoded.id}`);
  } catch (err) {
    console.error("Token decode error on logout:", err);
  }
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  await TokenBlacklist.create({ token });
  res.json({ message: "Logout successful" });
}