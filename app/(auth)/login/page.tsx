"use client";
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

const LoginPage = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center mb-2">Login</CardTitle>
        <CardDescription>
          Enter Your Email and Password an Account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AuthForm type="login" />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
