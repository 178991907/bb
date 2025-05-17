// @ts-nocheck
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Loader2 } from "lucide-react";

interface AdjustmentControlsProps {
  illuminationLevel: number;
  onIlluminationChange: (level: number[]) => void;
  onProcess: () => void;
  isProcessing?: boolean;
  canProcess?: boolean;
}

export function AdjustmentControls({
  illuminationLevel,
  onIlluminationChange,
  onProcess,
  isProcessing = false,
  canProcess = false,
}: AdjustmentControlsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="illumination-slider">Illumination Level: {illuminationLevel.toFixed(2)}</Label>
        <Slider
          id="illumination-slider"
          min={0}
          max={1}
          step={0.01}
          value={[illuminationLevel]}
          onValueChange={onIlluminationChange}
          disabled={isProcessing}
          className="my-2"
        />
        <p className="text-xs text-muted-foreground">
          Adjust how much to brighten the shadows. 0 means no change, 1 means maximum illumination.
        </p>
      </div>
      <Button
        onClick={onProcess}
        disabled={isProcessing || !canProcess}
        className="w-full transition-all duration-300 ease-in-out"
        size="lg"
      >
        {isProcessing ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        {isProcessing ? "Boosting Clarity..." : "Boost Clarity"}
      </Button>
    </div>
  );
}
