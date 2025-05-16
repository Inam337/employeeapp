import React from "react";
import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-md px-3 py-2 mt-1 text-sm font-medium ${className}`}
  >
    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
    <span>{children}</span>
  </div>
);
