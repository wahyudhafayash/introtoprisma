import nodemailer from "nodemailer";
import handlebars from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";
dotenv.config;

export interface Email {
  from: string;
  to: string;
  subject: string;
  template: string;
  context: any;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use(
  "compile",
  handlebars({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".hbs",
  })
);

export const sendEmail = (email: Email) => {
  const mailOptions: Email = {
    from: email.from,
    to: email.to,
    subject: email.subject,
    template: email.template,
    context: email.context,
  };
  return transporter.sendMail(mailOptions);
};
