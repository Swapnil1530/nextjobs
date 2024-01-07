import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/actions/userRegister";

const RegisterPage = async () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center mb-2">Register</CardTitle>
        <CardDescription>
          Enter Your Information to Create an Account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AuthForm type="register" />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
