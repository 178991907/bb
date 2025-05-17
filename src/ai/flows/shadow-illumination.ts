// Implemented by the user.
'use server';
/**
 * @fileOverview An AI agent that brightens and enhances dark areas in an image.
 *
 * - shadowIllumination - A function that handles the shadow illumination process.
 * - ShadowIlluminationInput - The input type for the shadowIllumination function.
 * - ShadowIlluminationOutput - The return type for the shadowIllumination function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShadowIlluminationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be processed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  illuminationLevel: z
    .number()
    .min(0)
    .max(1)
    .default(0.5)
    .describe('The level of illumination to apply to the shadows.'),
});
export type ShadowIlluminationInput = z.infer<typeof ShadowIlluminationInputSchema>;

const ShadowIlluminationOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe('The enhanced photo with illuminated shadows, as a data URI.'),
});
export type ShadowIlluminationOutput = z.infer<typeof ShadowIlluminationOutputSchema>;

export async function shadowIllumination(input: ShadowIlluminationInput): Promise<ShadowIlluminationOutput> {
  return shadowIlluminationFlow(input);
}

const shadowIlluminationPrompt = ai.definePrompt({
  name: 'shadowIlluminationPrompt',
  input: {schema: ShadowIlluminationInputSchema},
  output: {schema: ShadowIlluminationOutputSchema},
  prompt: [
    {media: {url: '{{{photoDataUri}}}'}},
    {
      text: `Brighten the dark areas of the image to reveal details hidden in the shadows.
Apply an illumination level of {{{illuminationLevel}}}. Return the enhanced image as a data URI.`,
    },
  ],
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const shadowIlluminationFlow = ai.defineFlow(
  {
    name: 'shadowIlluminationFlow',
    inputSchema: ShadowIlluminationInputSchema,
    outputSchema: ShadowIlluminationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text: `Brighten the dark areas of the image to reveal details hidden in the shadows.
Apply an illumination level of ${input.illuminationLevel}. Return the enhanced image as a data URI.`,
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {enhancedPhotoDataUri: media.url!};
  }
);
