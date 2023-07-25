"use client";
import { register, signin } from "lib/api";
import React, { useState, useCallback } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Good to see you again!",
  subheader: "Enter your credentials to continue with your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace("/home");
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );
  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
   <div className="w-full max-w-sm mx-auto ">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">{content.header}</h2>
    <p className="text-lg text-gray-600">{content.subheader}</p>
  </div>
  <form onSubmit={handleSubmit} className="py-8 px-4 bg-transparent rounded-lg shadow-md border-[2px]">
    {mode === "register" && (
      <div className="flex mb-6">
        <div className="pr-2 flex-1">
          <label htmlFor="firstName" className="block text-lg mb-2 text-gray-600">
            First Name
          </label>
          <Input
            required
            id="firstName"
            placeholder="First Name"
            value={formState.firstName}
            className="border border-gray-300 px-4 py-2 text-lg rounded-lg w-full transition duration-300 focus:outline-none focus:border-blue-500 bg-transparent hover:bg-gray-100"
            onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))}
          />
        </div>
        <div className="pl-2 flex-1">
          <label htmlFor="lastName" className="block text-lg mb-2 text-gray-600">
            Last Name
          </label>
          <Input
            required
            id="lastName"
            placeholder="Last Name"
            value={formState.lastName}
            className="border border-gray-300 px-4 py-2 text-lg rounded-lg w-full transition duration-300 focus:outline-none focus:border-blue-500 bg-transparent hover:bg-gray-100"
            onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))}
          />
        </div>
      </div>
    )}
    <div className="mb-6">
      <label htmlFor="email" className="block text-lg mb-2 text-gray-600">
        Email
      </label>
      <Input
        required
        type="email"
        id="email"
        placeholder="Email"
        value={formState.email}
        className="border border-gray-300 px-4 py-2 text-lg rounded-lg w-full transition duration-300 focus:outline-none focus:border-blue-500 bg-transparent hover:bg-gray-100"
        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-lg mb-2 text-gray-600">
        Password
      </label>
      <Input
        required
        type="password"
        id="password"
        placeholder="Password"
        value={formState.password}
        className="border border-gray-300 px-4 py-2 text-lg rounded-lg w-full transition duration-300 focus:outline-none focus:border-blue-500 bg-transparent hover:bg-gray-100"
        onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
      />
    </div>
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <span>
          <Link href={content.linkUrl} className="text-blue-600 font-bold">
            {content.linkText}
          </Link>
        </span>
      </div>
      <div>
        <Button type="submit" intent="secondary">
          {content.buttonText}
        </Button>
      </div>
    </div>
  </form>
</div>
    </Card>
  );
}
