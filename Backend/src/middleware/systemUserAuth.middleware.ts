import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenBlacklist from "../models/blackList.model";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET


export const authenticateSystemUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    } 

    const decoded: any = jwt.verify(token, JWT_SECRET!);
    const user = await User.findById(decoded.id).select("+systemUser");
    if (!user || !user.systemUser) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("System user authentication error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
}