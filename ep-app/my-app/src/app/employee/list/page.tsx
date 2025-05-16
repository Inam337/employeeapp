"use client";

import { useState } from "react";
import DashboardLayout from "@/components/main/sidebar-layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for employee data records
const mockEmployeeData = [
  {
    id: "ED1001",
    employeeName: "John Doe",
    dataType: "Ngage DB",
    year: "2023",
    uploadDate: "2023-10-15",
    status: "Active",
  },
  {
    id: "ED1002",
    employeeName: "Jane Smith",
    dataType: "CSV File",
    year: "2023",
    uploadDate: "2023-10-12",
    status: "Active",
  },
  {
    id: "ED1003",
    employeeName: "Michael Brown",
    dataType: "Bulk Upload",
    year: "2022",
    uploadDate: "2022-12-05",
    status: "Archived",
  },
  {
    id: "ED1004",
    employeeName: "Sarah Johnson",
    dataType: "Ngage DB",
    year: "2023",
    uploadDate: "2023-09-20",
    status: "Active",
  },
  {
    id: "ED1005",
    employeeName: "David Williams",
    dataType: "CSV File",
    year: "2022",
    uploadDate: "2022-11-10",
    status: "Archived",
  },
  {
    id: "ED1006",
    employeeName: "Emily Davis",
    dataType: "Bulk Upload",
    year: "2023",
    uploadDate: "2023-08-15",
    status: "Active",
  },
];

export default function EmployeeDataListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState(mockEmployeeData);
  const router = useRouter();

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    return (
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dataType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Employee Data Records</CardTitle>
            <CardDescription>
              Manage and view all employee data records in the system
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by employee name, data type, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
              <Button
                onClick={() => router.push("/employee")}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Data</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.id}
                        </TableCell>
                        <TableCell>{record.employeeName}</TableCell>
                        <TableCell>{record.dataType}</TableCell>
                        <TableCell>{record.year}</TableCell>
                        <TableCell>{record.uploadDate}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {record.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No records found. Try a different search term.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div>
              Showing {filteredData.length} of {data.length} records
            </div>
            <div>Last updated: {new Date().toLocaleDateString()}</div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
