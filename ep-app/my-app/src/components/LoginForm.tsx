"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoGreen from "../assets/logo/green_logo.png";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    router.push("/dashboard");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    alert("Forgot password functionality will be implemented soon.");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Welcome Text */}
      <div className={cn("text-center mb-8")}>
        <div className="relative mx-auto w-[270px] h-[96px] mb-4">
          <Image
            src={LogoGreen}
            alt="Login Banner"
            className="object-contain"
            width={270}
            height={96}
          />
        </div>
        <p className="text-base">
          Welcome to our Complaints Management System! We're glad to have you
          here and look forward to helping you resolve any issues you may have.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className={cn("space-y-6")}>
        <div className="space-y-2">
          <Label htmlFor="email">Email or Phone Number</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className={cn("flex items-center justify-between")}>
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={cn("flex items-center justify-end")}>
            <Button
              variant="outline"
              onClick={handleForgotPassword}
              type="button"
              size="sm"
            >
              Forgot Password?
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-green-700 text-white py-2 rounded"
        >
          Login
        </Button>
      </form>

      {/* Register Link */}
      <div className={cn("flex items-center justify-center mt-6")}>
        <p className={cn("text-sm")}>Don't have an account?</p>
        <Button
          variant="outline"
          className="ml-2 text-green-600"
          onClick={handleRegister}
          size="sm"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
