import bcrypt from "bcryptjs";
import { prisma } from "../models/prisma.ts";

export type User = {
  email: string;
  password: string;
  image?: string;
};

export const register = async (auth: User) => {
  const hashedPassword = await bcrypt.hash(auth.password, 10);
  return await prisma.user.create({
    data: {
      email: auth.email,
      password: hashedPassword,
      image: auth.image,
    },
  });
};

export const login = async (auth: User) => {
  const user = await prisma.user.findUnique({ where: { email: auth.email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(auth.password, user.password);
  if (!valid) throw new Error("Invalid password");
  return user;
};
