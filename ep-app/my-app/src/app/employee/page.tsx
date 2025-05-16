"use client";

import EmployeeDataUpload from "@/components/employee-data-upload/employee-data-upload";
import DashboardLayout from "@/components/main/sidebar-layout";
export default function EmployeeDataPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <EmployeeDataUpload />
      </div>
    </DashboardLayout>
  );
}
