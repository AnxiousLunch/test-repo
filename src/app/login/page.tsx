"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/Labels";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginFormDemo() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add this line at the top of the function
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  
  return (
    
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome back to Arsenic
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
          Please enter your details to sign in
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={handleChange}
            />
          </LabelInputContainer>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-black focus:ring-black dark:border-gray-700 dark:bg-gray-900"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-neutral-600 dark:text-neutral-400"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-md w-full h-10 font-medium"
          >
            Sign in &rarr;
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-neutral-600 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center h-10 w-full border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
               <IconBrandGoogle className="w-5 h-5 text-gray-700 opacity-80" />
               <span className="ml-2 text-gray-600">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-10 w-full border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <IconBrandGithub className="w-5 h-5 text-gray-700 opacity-80" />
                <span className="ml-2 text-gray-600">GitHub</span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link 
              href="/signup"
              className="text-black dark:text-white hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>{children}</div>
  );
};
