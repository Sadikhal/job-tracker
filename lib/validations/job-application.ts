import { z } from "zod";


export const jobApplicationSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters")
    .trim(),
  
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be less than 100 characters")
    .trim(),
  
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  salary: z
    .string()
    .max(50, "Salary must be less than 50 characters")
    .trim()
    .regex(/^[\d,.$\s\-kK]*$/, "Salary must be numeric (e.g. 120000) or valid format (e.g. $120k)")
    .optional()
    .or(z.literal("")),
  
  jobUrl: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .optional()
    .or(z.literal("")),
  
  tags: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  
  notes: z
    .string()
    .max(2000, "Notes must be less than 2000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
});


export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;


export const updateJobApplicationSchema = jobApplicationSchema.partial();

export type JobApplicationUpdate = z.infer<typeof updateJobApplicationSchema>;
