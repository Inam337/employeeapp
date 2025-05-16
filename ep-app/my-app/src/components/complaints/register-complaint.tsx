"use client";

import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, FileIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SheetClose } from "@/components/ui/sheet";

interface FormValues {
  complainantType: "general" | "child";
  fullName: string;
  cnic: string;
  email: string;
  mobileNumber: string;
  phone?: string;
  region?: string;
  address: string;
  title: string;
  description: string;
  affirmAffidavit: boolean;
  attachment?: File | null;
}

interface RegisterComplaintProps {
  onSuccess?: () => void;
}

const RegisterComplaint: React.FC<RegisterComplaintProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  // Initial form values
  const initialValues: FormValues = {
    complainantType: "general",
    fullName: "",
    cnic: "",
    email: "",
    mobileNumber: "",
    phone: "",
    region: "",
    address: "",
    title: "",
    description: "",
    affirmAffidavit: false,
    attachment: null,
  };

  // Validation schemas for each step
  const step1ValidationSchema = Yup.object({
    complainantType: Yup.string()
      .oneOf(["general", "child"])
      .required("This field is required"),
    fullName: Yup.string().required("This field is required"),
    cnic: Yup.string()
      .matches(/^\d{13}$/, "CNIC must be 13 digits")
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    mobileNumber: Yup.string()
      .required("This field is required")
      .matches(/^[0-9+\-\s]+$/, "Invalid mobile number format"),
    address: Yup.string().required("This field is required"),
  });

  const step2ValidationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Title must be between 10-100 characters")
      .max(100, "Title must be between 10-100 characters")
      .required("This field is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("This field is required"),
    affirmAffidavit: Yup.boolean()
      .oneOf([true], "You must affirm the affidavit")
      .required("This field is required"),
  });

  // Get validation schema based on current step
  const getValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return step1ValidationSchema;
      case 2:
        return step2ValidationSchema;
      default:
        return Yup.object({});
    }
  };

  // Setup formik
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: getValidationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (currentStep < 2) {
        // Move to the next step
        setCurrentStep((prev) => prev + 1);
      } else {
        // Submit the form
        console.log("Form submitted:", values);
        setShowSuccessDialog(true);

        // If onSuccess callback was provided, call it
        if (onSuccess) {
          onSuccess();
        }
      }
    },
  });

  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Helper to check if a field has an error
  const hasError = (fieldName: keyof FormValues) => {
    return !!(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  // Helper to get error message for a field
  const getErrorMessage = (fieldName: keyof FormValues) => {
    return hasError(fieldName) ? formik.errors[fieldName] : "";
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    formik.setFieldValue("attachment", file);
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    formik.setFieldValue("attachment", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get file size in readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Close sheet and reset form after successful submission
  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    formik.resetForm();
    setCurrentStep(1);
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white">
        <p className="text-sm text-muted-foreground mb-4">
          Complaint details (Required fields are marked with *)
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Step 1: Complainant Information */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col">
              <h3 className="text-md font-medium text-gray-500 mb-2">
                Complaint Type
              </h3>
              <div className="flex items-center gap-2">
                <RadioGroup
                  name="complainantType"
                  className="flex flex-row"
                  defaultValue={formik.values.complainantType}
                  onValueChange={(value: string) =>
                    formik.setFieldValue("complainantType", value)
                  }
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="child" id="child" />
                    <Label htmlFor="child">Child</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="border-t pt-4 mt-4"></div>
              <h3 className="text-md font-medium text-gray-500 mb-2">
                Complainant Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("fullName") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("fullName") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("fullName")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnic">
                    CNIC
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    value={formik.values.cnic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("cnic") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("cnic") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("cnic")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("email") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("email") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("email")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">
                    Mobile Number
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("mobileNumber") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("mobileNumber") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("mobileNumber")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      name="region"
                      value={formik.values.region}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("address") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("address") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("address")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Complaint Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Complaint Details</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      hasError("title") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("title") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("title")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "min-h-[120px]",
                      hasError("description") &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Describe your complaint in detail"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {formik.values.description?.length || 0}/1000
                  </div>
                  {hasError("description") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage("description")}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Attachments</h4>
                  <div className="border-dashed border border-primary rounded-md p-3 bg-gray-50">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                      <div className="w-full md:flex-grow">
                        <p className="font-medium text-sm">Upload Files</p>
                        <p className="text-xs text-muted-foreground">
                          Upload relevant files (PDF, JPG, JPEG, PNG - max 5MB)
                        </p>
                      </div>
                      <Button
                        type="button"
                        className="w-full sm:w-auto text-primary-foreground text-white text-sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload
                      </Button>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </div>

                    {selectedFile && (
                      <div className="mt-2 p-2 bg-white border rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-xs font-medium">
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
                            className="h-6 w-6 p-0"
                            onClick={handleRemoveFile}
                          >
                            <XIcon className="h-3 w-3" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="affirmAffidavit"
                    name="affirmAffidavit"
                    checked={formik.values.affirmAffidavit}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("affirmAffidavit", checked)
                    }
                    className={cn(
                      hasError("affirmAffidavit") && "border-red-500"
                    )}
                  />
                  <div className="grid gap-1 leading-none">
                    <label
                      htmlFor="affirmAffidavit"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I affirm the Affidavit
                    </label>
                    <p className="text-xs text-muted-foreground">
                      I solemnly affirm that the information provided is true to
                      the best of my knowledge and belief.
                    </p>
                    {hasError("affirmAffidavit") && (
                      <p className="text-sm text-red-500">
                        {getErrorMessage("affirmAffidavit")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step indicator and navigation buttons */}
          <div className="border-t pt-4 mt-4"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 2
            </div>
            <div className="flex justify-end space-x-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  size="sm"
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="bg-primary" size="sm">
                {currentStep < 2 ? "Next" : "Register"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Hidden SheetClose reference */}
      <SheetClose ref={sheetCloseRef} className="hidden" />

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex items-center flex-row">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mr-2">
              <CheckIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-left text-lg font-medium text-gray-900">
                Success!
              </DialogTitle>
              <DialogDescription className="text-left mt-1">
                Your complaint has been registered successfully.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="mt-4">
            <Button className="w-full" onClick={handleSuccessClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterComplaint;
