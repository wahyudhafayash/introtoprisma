import { Request, Response } from "express";
import { verifyToken } from "../utils/jwt.ts";

export const authenticationToken = (
  req: Request,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      message: "No token provided",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }
};
