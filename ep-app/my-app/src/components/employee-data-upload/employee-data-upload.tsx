"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Generate years for dropdown (current year and 5 years back)
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => currentYear - i);
};

// Mock data for employees
const employees = [
  { value: "emp1", label: "John Doe" },
  { value: "emp2", label: "Jane Smith" },
  { value: "emp3", label: "Michael Brown" },
  { value: "emp4", label: "Sarah Johnson" },
  { value: "emp5", label: "David Williams" },
  { value: "emp6", label: "Emily Davis" },
  { value: "emp7", label: "Robert Miller" },
  { value: "emp8", label: "Lisa Wilson" },
];

interface FormValues {
  dataSourceType: string;
  year: string;
  employee: string;
  file: File | null;
}

const EmployeeDataUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const years = generateYears();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    dataSourceType: Yup.string().required("Data source type is required"),
    year: Yup.string().required("Year is required"),
    employee: Yup.string().required("Employee is required"),
    file: Yup.mixed().required("File is required"),
  });

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      dataSourceType: "",
      year: "",
      employee: "",
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", values);

        // Show success toast with Sonner
        toast.success("Employee data uploaded successfully", {
          description: "Your data has been processed and saved",
          duration: 5000,
        });

        // Redirect to listing page
        setTimeout(() => {
          router.push("/employee/list");
        }, 1000);

        setIsSubmitting(false);
      }, 1500);
    },
  });

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    formik.setFieldValue("file", file);
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    formik.setFieldValue("file", null);
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Get file size in readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Helper to check if a field has an error
  const hasError = (fieldName: keyof FormValues) => {
    return !!(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  // Helper to get error message for a field
  const getErrorMessage = (fieldName: keyof FormValues) => {
    return hasError(fieldName) ? formik.errors[fieldName] : "";
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Employee Data Upload</CardTitle>
          <CardDescription>
            Upload employee data from different sources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Data Source Type */}
              <div className="space-y-2 w-full">
                <Label htmlFor="dataSourceType">
                  Data Source Type<span className="text-red-500">*</span>
                </Label>
                <Select
                  name="dataSourceType"
                  value={formik.values.dataSourceType}
                  onValueChange={(value) => {
                    formik.setFieldValue("dataSourceType", value);
                  }}
                >
                  <SelectTrigger
                    id="dataSourceType"
                    className={cn(
                      "w-full",
                      hasError("dataSourceType") &&
                        "border-red-500 focus:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngage_db">Ngage DB</SelectItem>
                    <SelectItem value="csv_file">CSV File</SelectItem>
                    <SelectItem value="bulk_upload">Bulk Upload</SelectItem>
                  </SelectContent>
                </Select>
                {hasError("dataSourceType") && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage("dataSourceType")}
                  </p>
                )}
              </div>

              {/* Year */}
              <div className="space-y-2 w-full">
                <Label htmlFor="year">
                  Year<span className="text-red-500">*</span>
                </Label>
                <Select
                  name="year"
                  value={formik.values.year}
                  onValueChange={(value) => {
                    formik.setFieldValue("year", value);
                  }}
                >
                  <SelectTrigger
                    id="year"
                    className={cn(
                      "w-full",
                      hasError("year") && "border-red-500 focus:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasError("year") && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage("year")}
                  </p>
                )}
              </div>

              {/* Employee Select */}
              <div className="space-y-2 w-full">
                <Label htmlFor="employee">
                  Employee<span className="text-red-500">*</span>
                </Label>
                <Select
                  name="employee"
                  value={formik.values.employee}
                  onValueChange={(value) => {
                    formik.setFieldValue("employee", value);
                  }}
                >
                  <SelectTrigger
                    id="employee"
                    className={cn(
                      "w-full",
                      hasError("employee") &&
                        "border-red-500 focus:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.value} value={employee.value}>
                        {employee.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasError("employee") && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage("employee")}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2 w-full col-span-1 lg:col-span-2">
                <Label htmlFor="file" className="w-full flex mb-4">
                  File<span className="text-red-500">*</span>
                </Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col items-center justify-center",
                    hasError("file") && "border-red-500",
                    selectedFile ? "bg-slate-50" : "bg-white"
                  )}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv,.xlsx,.xls"
                  />
                  <div className="flex flex-col items-center text-center">
                    <UploadIcon className="h-10 w-10 text-blue-500 mb-2" />
                    <p className="text-sm font-medium">Upload</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CSV, Excel files (max. 10MB)
                    </p>
                  </div>
                </div>

                {selectedFile && (
                  <div className="mt-3 flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                    <div className="flex items-center space-x-3">
                      <UploadIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-gray-200"
                      onClick={(e) => {
                        handleRemoveFile();
                      }}
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                )}

                {hasError("file") && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage("file")}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/employee/list")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmployeeDataUpload;
