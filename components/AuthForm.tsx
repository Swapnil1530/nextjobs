"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { registerUser } from "@/actions/userRegister";
import { toast } from "./ui/use-toast";
import LoadingButton from "./LoadingButton";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const AuthForm = ({ type }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const [query, setQuery] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (type === "register") {
      try {
        await registerUser({
          name: query.name,
          email: query.email,
          password: query.password,
        });

        setIsSubmitting(false);
        toast({
          title: "Registration Success",
          description: "You have successfully registered",
        });
        router.push("/post");
      } catch (error: any) {
        setIsSubmitting(false);

        toast({
          title: "Registration Failed",
          description: `${error.message}`,
        });
      }
    } else {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: query.email,
          password: query.password,
        });
        setIsSubmitting(false);
        if (!res?.ok) {
          throw new Error("Invalid Credentials");
        }

        toast({
          title: "Login Success",
          description: "You have successfully logged in",
        });
      } catch (error: any) {
        setIsSubmitting(false);
        toast({
          title: "Login Failed",
          description: `${error.message}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      {type === "register" ? (
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Swapnil Patel"
            onChange={handleChange()}
          />
        </div>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          onChange={handleChange()}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={handleChange()}
          name="password"
        />
      </div>
      {type === "register" ? (
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Register
        </LoadingButton>
      ) : (
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Login
        </LoadingButton>
      )}
    </>
  );
};

export default AuthForm;
