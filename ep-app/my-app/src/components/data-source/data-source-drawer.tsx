"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrorMessage } from "@/components/ui/form-error-message";

const dataSourceTypes = [
  { value: "csv", label: "CSV" },
  { value: "api", label: "API" },
  { value: "database", label: "Database" },
  { value: "excel", label: "Excel" },
  { value: "json", label: "JSON" },
];

const sourceOptions = [
  { value: "manual", label: "Manual" },
  { value: "api", label: "API" },
  { value: "upload", label: "Upload" },
];

interface DataSourceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataSource?: {
    id?: string;
    title?: string;
    source?: string;
    type?: string;
    description?: string;
  } | null;
}

export function DataSourceDrawer({
  open,
  onOpenChange,
  dataSource,
}: DataSourceDrawerProps) {
  const router = useRouter();
  const isEditing = !!dataSource?.id;

  // Form state
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Reset form when dataSource changes (for editing)
  useEffect(() => {
    if (dataSource) {
      setTitle(dataSource.title || "");
      setSource(dataSource.source || "");
      setType(dataSource.type?.toLowerCase() || "");
      setDescription(dataSource.description || "");
      setErrors({});
    } else {
      setTitle("");
      setSource("");
      setType("");
      setDescription("");
      setErrors({});
    }
  }, [dataSource, open]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!source.trim()) newErrors.source = "Source is required";
    if (!type.trim()) newErrors.type = "Type is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      toast.success(
        isEditing
          ? "Data source updated successfully"
          : "Data source created successfully",
        {
          description: isEditing
            ? "Your data source has been updated"
            : "Your data source has been created",
          duration: 3000,
        }
      );
      onOpenChange(false);
      setSubmitting(false);
      setTimeout(() => {
        router.refresh();
      }, 500);
    }, 1000);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full max-h-full overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {isEditing ? "Edit Data Source" : "Create New Data Source"}
          </DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>
        <div className="px-4 py-2">
          <form className="space-y-6 py-2" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title" className="w-full flex mb-4">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="Enter title"
                disabled={submitting}
              />
              {errors.title && (
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              )}
            </div>
            <div>
              <Label htmlFor="source" className="w-full flex mb-4">
                Source
              </Label>
              <Select
                value={source}
                onValueChange={(value) => {
                  setSource(value);
                  if (errors.source)
                    setErrors((prev) => ({ ...prev, source: "" }));
                }}
                disabled={submitting}
              >
                <SelectTrigger id="source" className="w-full">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.source && (
                <FormErrorMessage>{errors.source}</FormErrorMessage>
              )}
            </div>
            <div>
              <Label htmlFor="type" className="w-full flex mb-4">
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(value) => {
                  setType(value);
                  if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
                }}
                disabled={submitting}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {dataSourceTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              )}
            </div>
            <div>
              <Label htmlFor="description" className="w-full flex mb-4">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: "" }));
                }}
                placeholder="Enter description"
                className="min-h-[120px]"
                disabled={submitting}
              />
              {errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </div>
            <DrawerFooter className="w-full flex-row  px-0 flex justify-end gap-2 items-center">
              <Button
                type="button"
                variant="outline"
                className="w-4/12"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>{" "}
              <Button type="submit" disabled={submitting} className="w-4/12">
                {submitting ? "Saving..." : "Save"}
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
