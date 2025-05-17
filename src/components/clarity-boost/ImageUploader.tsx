// @ts-nocheck
"use client";

import type React from "react";
import { useState, useCallback, type ChangeEvent, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUri: string) => void;
  disabled?: boolean;
}

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ImageUploader({ onImageUpload, disabled }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid File Type",
            description: "Please upload an image file (e.g., PNG, JPG, WEBP).",
            variant: "destructive",
          });
          return;
        }
        // Max file size: 5MB (example)
        if (file.size > 5 * 1024 * 1024) {
           toast({
            title: "File Too Large",
            description: "Please upload an image smaller than 5MB.",
            variant: "destructive",
          });
          return;
        }
        try {
          const dataUri = await fileToDataUri(file);
          onImageUpload(file, dataUri);
          setFileName(file.name);
        } catch (error) {
          console.error("Error reading file:", error);
          toast({
            title: "Upload Error",
            description: "Could not read the selected file.",
            variant: "destructive",
          });
        }
      }
    },
    [onImageUpload, toast]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (!disabled && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">Upload Image</Label>
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          "border-border hover:border-primary/70",
          disabled ? "bg-muted/50 cursor-not-allowed" : "bg-card hover:bg-accent/10",
          dragging && !disabled ? "border-primary bg-primary/10" : ""
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById('image-upload-input')?.click()}
      >
        <Input
          id="image-upload-input"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleInputChange}
          disabled={disabled}
        />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadCloud className={cn("w-10 h-10 mb-3", disabled ? "text-muted-foreground/50" : "text-primary")} />
          <p className={cn("mb-2 text-sm", disabled ? "text-muted-foreground/50" : "text-foreground")}>
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className={cn("text-xs", disabled ? "text-muted-foreground/50" : "text-muted-foreground")}>
            PNG, JPG, WEBP (MAX. 5MB)
          </p>
          {fileName && !disabled && (
            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
              Selected: {fileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
