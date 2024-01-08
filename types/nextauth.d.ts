import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;
type role = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;

      role: role;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    role: string;
    email: string;
  }
}
