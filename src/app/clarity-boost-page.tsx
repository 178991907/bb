// @ts-nocheck
"use client";

import { useState, useCallback, useEffect } from "react";
import { processImageAction } from "./actions";
import { ImageUploader } from "@/components/clarity-boost/ImageUploader";
import { AdjustmentControls } from "@/components/clarity-boost/AdjustmentControls";
import { ComparisonDisplay } from "@/components/clarity-boost/ComparisonDisplay";
import { DownloadButton } from "@/components/clarity-boost/DownloadButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClarityBoostPage() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageDataUri, setOriginalImageDataUri] = useState<string | null>(null);
  const [enhancedImageDataUri, setEnhancedImageDataUri] = useState<string | null>(null);
  const [illuminationLevel, setIlluminationLevel] = useState<number>(0.5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = useCallback((file: File, dataUri: string) => {
    setOriginalImageFile(file);
    setOriginalImageDataUri(dataUri);
    setEnhancedImageDataUri(null); // Reset enhanced image on new upload
    setError(null); // Reset error on new upload
    toast({
      title: "Image Uploaded",
      description: `${file.name} is ready for processing.`,
    });
  }, [toast]);

  const handleIlluminationChange = useCallback((levels: number[]) => {
    setIlluminationLevel(levels[0]);
  }, []);

  const handleProcessImage = useCallback(async () => {
    if (!originalImageDataUri) {
      setError("Please upload an image first.");
      toast({
        title: "Processing Error",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedImageDataUri(null); // Clear previous enhanced image

    toast({
      title: "Processing Image",
      description: "Boosting clarity, please wait...",
    });

    const result = await processImageAction({
      photoDataUri: originalImageDataUri,
      illuminationLevel: illuminationLevel,
    });

    setIsLoading(false);
    if (result.success && result.data) {
      setEnhancedImageDataUri(result.data.enhancedPhotoDataUri);
      toast({
        title: "Processing Complete",
        description: "Your image has been enhanced!",
        variant: "default",
      });
    } else {
      const errorMessage = result.error || "Failed to process image.";
      setError(errorMessage);
      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [originalImageDataUri, illuminationLevel, toast]);
  
  // Effect to clear error message after a few seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Clear error after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
          ClarityBoost
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Reveal hidden details in your photos. Upload an image, adjust the shadow illumination, and see the magic happen.
        </p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-4 shadow-xl transition-all hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Controls</CardTitle>
            <CardDescription>Upload your image and adjust settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
            <AdjustmentControls
              illuminationLevel={illuminationLevel}
              onIlluminationChange={handleIlluminationChange}
              onProcess={handleProcessImage}
              isProcessing={isLoading}
              canProcess={!!originalImageDataUri}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-8 space-y-8">
           {error && (
            <Alert variant="destructive" className="transition-opacity duration-300 ease-in-out">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <ComparisonDisplay
            originalImageUri={originalImageDataUri}
            enhancedImageUri={enhancedImageDataUri}
            isLoading={isLoading}
          />
          {enhancedImageDataUri && !isLoading && (
            <div className="flex justify-center mt-6">
               <DownloadButton 
                enhancedImageUri={enhancedImageDataUri}
                originalFileName={originalImageFile?.name}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClarityBoost. Powered by AI.</p>
      </footer>
    </div>
  );
}
