import { z } from "zod";

export const CreateFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    description: z.string(),
    
});

export type CreateFormSchema = z.infer<typeof CreateFormSchema>;