"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/Labels";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { SignUpData } from "@/types";

export default function SignupFormDemo() {
  const [formData, setFormData] = useState<SignUpData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    twitterpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Arsenic</h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" onChange={handleChange} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Your Twitter Password</Label>
            <Input id="twitterpassword" placeholder="••••••••" type="password" onChange={handleChange} />
          </LabelInputContainer>
  
          <button type="submit" className="bg-black text-white rounded-md w-full h-10 font-medium">
            Sign up &rarr;
          </button>
        </form>
      </div>
    </div>
  );
  
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>;
};
