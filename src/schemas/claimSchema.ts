import { z } from "zod";

export const claimSchema = z.object({
  itemId: z.number().int().positive("Select an item to claim."),
  claimantEmail: z.string().trim().email("Enter a valid campus email address."),
  claimDetails: z
    .string()
    .trim()
    .min(20, "Describe at least 20 characters about why this item is yours.")
    .refine(
      (details) => /\b(black|blue|red|green|white|near|library|lounge|bag|bottle|umbrella|keys)\b/i.test(details),
      "Include a distinguishing color, location, or item feature."
    ),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;
