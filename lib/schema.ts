import { z } from "zod";

export const formCreateSchema = z.object({
  buttonType: z.enum(["Manually", "Ai"], {
    required_error: "Button type is required",
    invalid_type_error: "Button type must be either 'Manually' or 'Ai'",
  }),
  textareaValue: z.string()
}).refine((data) => {
  if (data.buttonType === "Ai" && data.textareaValue.trim() === "") {
    return false;
  }
  return true;
}, {
  message: "Please enter your idea to generate the form",
  path: ["textareaValue"]
});

export type FormCreateInput = z.infer<typeof formCreateSchema>;
