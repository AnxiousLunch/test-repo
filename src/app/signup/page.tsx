"use client";
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/Labels";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Link from "next/link";

interface SignUpData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  profilePhoto: File | null;
}

export default function SignupFormDemo() {
  const [formData, setFormData] = useState<SignUpData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    profilePhoto: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.type === "file" && (e.target as HTMLInputElement).files?.[0]) {
      const file = (e.target as HTMLInputElement).files[0];
      setFormData({ ...formData, profilePhoto: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Arsenic
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col items-center">
            <div 
              className="relative w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-2 overflow-hidden cursor-pointer"
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" id="profilePhoto" accept="image/*" className="hidden" onChange={handleChange} />
            <Label htmlFor="profilePhoto" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              {previewUrl ? "Change photo" : "Upload photo"}
            </Label>
          </div>

          <LabelInputContainer>
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" placeholder="Durden" type="text" onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="tyler_durden" type="text" onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" onChange={handleChange} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" className="border rounded-md p-2 dark:bg-black dark:text-white text-gray-500" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
          </LabelInputContainer>

          <button type="submit" className="bg-black text-white rounded-md w-full h-10 font-medium">
            Sign up &rarr;
          </button>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
            Have an account? {" "}
            <Link href="/login" className="text-black dark:text-white hover:underline font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>;
};
