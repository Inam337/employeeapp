"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import OnboardingLayout from "@/components/main/landing-layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginBanner from "../../assets/logo/Banner.png";
import PurpleLogo from "../../assets/logo/ngage_logo.png";
export default function OnboardingPage() {
  const router = useRouter();

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = () => {
    router.push("/dashboard");
  };

  return (
    <OnboardingLayout>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Image side (left in LTR, right in RTL) */}
        <div className={cn("relative w-full md:w-1/2 h-64 md:h-auto")}>
          <Image
            src={LoginBanner}
            alt="Onboarding Banner"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Content side (right in LTR, left in RTL) */}
        <div
          className={cn("w-full md:w-1/2 flex items-center justify-center p-6")}
        >
          <div className="w-full max-w-md space-y-6">
            {/* Language Dropdown */}
            <div className={cn("flex")}></div>
            <div className="w-full flex items-center justify-center">
              <Image
                src={PurpleLogo}
                alt="Login Banner"
                className="object-contain m-0"
                width={270}
                height={96}
              />
            </div>

            {/* Logo + Welcome Text */}
            <div className={cn("text-center space-y-2")}>
              <p className="text-lg font-bold text-black">daadad</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition bg-primary text-white"
                onClick={handleCardClick}
              >
                <CardContent className="flex items-center justify-between">
                  {/* Content with icon and text */}
                  <div className={cn("flex items-center gap-3")}>
                    {/* Icon */}
                    <User className="text-white" />

                    {/* Text */}
                    <div>
                      <p className="text-xs text-white opacity-90">ddd</p>
                    </div>
                  </div>

                  <ChevronRight className="text-white" />
                </CardContent>
              </Card>
            </div>

            {/* Login Prompt */}
            <div className={cn("text-center text-sm")}>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-green-600 text-green-600 hover:bg-green-50"
                )}
                onClick={() => router.push("/login")}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
