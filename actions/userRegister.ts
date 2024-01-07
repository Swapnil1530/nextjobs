"use server";

import prisma from "./../lib/prisma";
import bcrypt from "bcrypt";
type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
};
export async function registerUser(params: RegisterUserParams) {
  try {
    const { name, email, password } = params;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
