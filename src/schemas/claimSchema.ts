import { z } from "zod";

export const claimSchema = z.object({
  itemId: z.number().int().positive("Select an item to claim."),
  claimantEmail: z.string().trim().email("Enter a valid campus email address."),
  claimDetails: z
    .string()
    .trim()
    .min(20, "Describe at least 20 characters about why this item is yours."),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;
