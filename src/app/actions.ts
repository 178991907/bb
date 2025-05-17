// @ts-nocheck
'use server';

import { shadowIllumination, type ShadowIlluminationInput, type ShadowIlluminationOutput } from '@/ai/flows/shadow-illumination';

interface ProcessImageResult {
  success: boolean;
  data?: ShadowIlluminationOutput;
  error?: string;
}

export async function processImageAction(
  input: ShadowIlluminationInput
): Promise<ProcessImageResult> {
  try {
    // The AI flow might have its own zod validation.
    // If direct invocation without schema validation is desired, ensure input matches schema.
    if (!input.photoDataUri || typeof input.illuminationLevel !== 'number') {
      return { success: false, error: 'Invalid input to AI flow.' };
    }

    const result = await shadowIllumination(input);
    return { success: true, data: result };
  } catch (e) {
    console.error('Error in processImageAction:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during image processing.';
    return { success: false, error: errorMessage };
  }
}
