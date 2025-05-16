"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormValues {
  phoneNumber: string;
  email: string;
  fullName: string;
  cnic: string;
  residenceCountry: string;
  nationality: string;
  province: string;
  district: string;
  tehsil: string;
  reasonAbroad: string;
  dateOfBirth: Date | string;
  gender: string;
  landline: string;
  password: string;
  confirmPassword: string;
  address: string;
  affidavit: boolean;
}

export default function RegisterForm() {
  const [date, setDate] = useState<Date | undefined>();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9]+$/, "Invalid phone number"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullName: Yup.string().required("Full name is required"),
    cnic: Yup.string()
      .required("CNIC is required")
      .matches(/^[0-9]{13}$/, "CNIC must be 13 digits"),
    residenceCountry: Yup.string().required("Residence country is required"),
    nationality: Yup.string().required("Nationality is required"),
    province: Yup.string().required("Province is required"),
    district: Yup.string().required("District is required"),
    tehsil: Yup.string().required("Tehsil is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    address: Yup.string().required("Address is required"),
    affidavit: Yup.boolean().oneOf([true], "You must affirm the affidavit"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      phoneNumber: "",
      email: "",
      fullName: "",
      cnic: "",
      residenceCountry: "",
      nationality: "",
      province: "",
      district: "",
      tehsil: "",
      reasonAbroad: "",
      dateOfBirth: "",
      gender: "",
      landline: "",
      password: "",
      confirmPassword: "",
      address: "",
      affidavit: false,
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
      // Handle form submission
    },
  });

  // Country options
  const countryOptions = [
    { value: "pakistan", label: "Pakistan" },
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    // Add more countries
  ];

  // Province options for Pakistan
  const provinceOptions = [
    { value: "sindh", label: "Sindh" },
    { value: "punjab", label: "Punjab" },
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "balochistan", label: "Balochistan" },
    // Add more provinces
  ];

  // Districts based on province
  const districtOptions: Record<
    string,
    Array<{ value: string; label: string }>
  > = {
    sindh: [
      { value: "karachi", label: "Karachi" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "sukkur", label: "Sukkur" },
      // Add more districts
    ],
    punjab: [
      { value: "lahore", label: "Lahore" },
      { value: "faisalabad", label: "Faisalabad" },
      { value: "multan", label: "Multan" },
      // Add more districts
    ],
    // Add more provinces and their districts
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Form Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-red-500">{formik.errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnic">CNIC (13 digits without dashes)</Label>
              <Input
                id="cnic"
                name="cnic"
                value={formik.values.cnic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="1234512345671"
              />
              {formik.touched.cnic && formik.errors.cnic && (
                <p className="text-sm text-red-500">{formik.errors.cnic}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formik.values.dateOfBirth ? (
                      typeof formik.values.dateOfBirth === "string" ? (
                        formik.values.dateOfBirth
                      ) : (
                        format(formik.values.dateOfBirth, "PPP")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      formik.setFieldValue("dateOfBirth", date);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="text-sm text-red-500">
                  {String(formik.errors.dateOfBirth)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                name="gender"
                onValueChange={(value) => formik.setFieldValue("gender", value)}
                defaultValue={formik.values.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-sm text-red-500">{formik.errors.gender}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Mobile Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="+923001234567"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landline">Landline (Optional)</Label>
              <Input
                id="landline"
                name="landline"
                value={formik.values.landline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-500">{formik.errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Set Password</h2>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Affidavit */}
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="affidavit"
              name="affidavit"
              checked={formik.values.affidavit}
              onCheckedChange={(checked) =>
                formik.setFieldValue("affidavit", Boolean(checked))
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="affidavit"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I declare that all the information provided is true and correct
                to the best of my knowledge.
              </label>
              {formik.touched.affidavit && formik.errors.affidavit && (
                <p className="text-sm text-red-500">
                  {String(formik.errors.affidavit)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="w-full md:w-auto">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
