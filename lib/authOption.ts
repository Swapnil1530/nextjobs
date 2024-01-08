import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import prisma from "./prisma";

interface User {
  id: string;
  email: string;
  role: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        } as User;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;

      return session;
    },
  },
};
