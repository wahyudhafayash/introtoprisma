import { Request, Response } from "express";
import { sendEmail, Email } from "../sevices/emailService.ts";
import dotenv from "dotenv";
dotenv.config;

export const createEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, context }: Email = req.body;
    const emailBody: Email = {
      from: process.env.EMAIL_USER as string,
      to: to,
      subject: subject,
      template: "emailTemplate",
      context: context,
    };
    await sendEmail(emailBody);
    res.status(201).send({
      message: "Email sent successfully to " + emailBody,
    });
  } catch (error: any) {
    res.status(500).send({
      message: "Error sending email",
      error: error.message,
    });
  }
};
