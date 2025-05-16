"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, EditIcon } from "lucide-react";
import { DataSourceDrawer } from "@/components/data-source/data-source-drawer";
import DashboardLayout from "@/components/main/sidebar-layout";
// Mock data for data sources
const dataSources = [
  {
    id: "1",
    title: "Employee Data 2023",
    type: "CSV",
    description: "Annual employee performance data",
    dataAvailable: true,
  },
  {
    id: "2",
    title: "Quarterly Reports",
    type: "API",
    description: "Quarterly financial metrics",
    dataAvailable: true,
  },
  {
    id: "3",
    title: "Customer Feedback",
    type: "Database",
    description: "Customer satisfaction survey results",
    dataAvailable: false,
  },
];

export default function DataSourcesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDataSource, setEditingDataSource] = useState<{
    id?: string;
    title?: string;
    source?: string;
    type?: string;
    description?: string;
    dataAvailable?: boolean;
  } | null>(null);

  const openDrawer = (
    dataSource: {
      id: string;
      title: string;
      type: string;
      description: string;
      dataAvailable: boolean;
    } | null = null
  ) => {
    setEditingDataSource(dataSource);
    setDrawerOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Data Sources</CardTitle>
            <Button onClick={() => openDrawer()} className="ml-auto">
              <PlusIcon className="h-4 w-4 mr-2" /> Create New
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Data Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">
                      {source.title}
                    </TableCell>
                    <TableCell>{source.type}</TableCell>
                    <TableCell>{source.description}</TableCell>
                    <TableCell>
                      {source.dataAvailable ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => openDrawer(source)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Edit</span>
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <DataSourceDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          dataSource={editingDataSource}
        />
      </div>
    </DashboardLayout>
  );
}
