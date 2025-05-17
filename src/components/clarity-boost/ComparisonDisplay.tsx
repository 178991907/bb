// @ts-nocheck
"use client";

import type React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react"; // Using ImageIcon as a generic placeholder icon

interface ComparisonDisplayProps {
  originalImageUri: string | null;
  enhancedImageUri: string | null;
  isLoading?: boolean;
}

function ImageDisplayCard({ title, imageUri, isLoading, isPlaceholder = false, placeholderHint }: { title: string; imageUri: string | null; isLoading?: boolean; isPlaceholder?: boolean; placeholderHint?: string }) {
  const placeholderSrc = "https://placehold.co/500x375.png";
  return (
    <Card className="flex-1 min-w-[300px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="aspect-[4/3] flex items-center justify-center bg-muted/30 rounded-b-md">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-md" />
        ) : imageUri ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUri}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md transition-opacity duration-500 opacity-0"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Image 
              src={placeholderSrc}
              alt="Placeholder image"
              width={500}
              height={375}
              data-ai-hint={placeholderHint || "abstract photo"}
              className="object-contain opacity-50 rounded-md"
            />
            <p className="mt-2 text-sm">{isPlaceholder ? "Upload an image to see it here" : "Enhanced image will appear here"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export function ComparisonDisplay({
  originalImageUri,
  enhancedImageUri,
  isLoading = false,
}: ComparisonDisplayProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <ImageDisplayCard title="Original Image" imageUri={originalImageUri} isPlaceholder placeholderHint="photography studio" />
      <ImageDisplayCard title="Enhanced Image" imageUri={enhancedImageUri} isLoading={isLoading} placeholderHint="bright landscape" />
    </div>
  );
}
