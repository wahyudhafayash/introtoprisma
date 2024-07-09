import { Request, Response } from "express";
import * as authService from "../sevices/authService.ts";
import { generateToken } from "../utils/jwt.ts";
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const image = req.file?.filename;

    const bodyRequest: authService.User = {
      email: email,
      password: password,
      image: image,
    };
    await authService.register(bodyRequest);
    res.status(201).send({
      message: "User registered successfully",
    });
  } catch (error: any) {
    res.status(400).send({
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const bodyRequest = {
      email: email,
      password: password,
    };
    const user = await authService.login(bodyRequest);
    const token = generateToken(user.id);
    res.status(200).send({
      message: "User Logged In",
      token: token,
    });
  } catch (error: any) {
    res.status(400).send({
      error: error.message,
    });
  }
};
