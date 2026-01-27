
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Malformed token",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
