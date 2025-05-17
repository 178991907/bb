// @ts-nocheck
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  enhancedImageUri: string | null;
  originalFileName?: string | null;
  disabled?: boolean;
}

const downloadImage = (dataUri: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function DownloadButton({ enhancedImageUri, originalFileName, disabled }: DownloadButtonProps) {
  
  const handleDownload = () => {
    if (enhancedImageUri) {
      const baseName = originalFileName ? originalFileName.substring(0, originalFileName.lastIndexOf('.')) : "enhanced_image";
      const extension = originalFileName ? originalFileName.substring(originalFileName.lastIndexOf('.')) : ".png";
      const downloadFileName = `${baseName}_clarityboost${extension}`;
      downloadImage(enhancedImageUri, downloadFileName);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={!enhancedImageUri || disabled}
      className="w-full md:w-auto transition-all duration-300 ease-in-out"
      variant="outline"
      size="lg"
    >
      <Download className="mr-2 h-5 w-5" />
      Download Enhanced Image
    </Button>
  );
}
