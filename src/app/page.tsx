"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import LoginFormDemo from "@/components/login-form-demo";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-950 relative">
      <div className="relative z-50">
        <LoginFormDemo/>
      </div>
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>
    </main>
  );
}