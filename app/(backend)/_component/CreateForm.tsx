"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitForm } from "../../../server_action/form_submit_actions";
import { formCreateSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CreateForm = () => {
  const router = useRouter();
  const [textareaValue, setTextareaValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processingButton, setProcessingButton] = useState<string | null>(null);

  const formMutation = useMutation({
    mutationFn: async (buttonType: string) => {
      try {
        return await submitForm(buttonType, textareaValue);
      } catch (error) {
        console.error("Server error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setSuccess("Form created successfully!");
      setTextareaValue("");
      // Redirect to the new form page
      if (data?.data?.id) {
        router.push(`/forms/${data.data.id}`);
      }
    },
    onSettled: () => {
      setProcessingButton(null);
    },
  });

  const handleSubmit = (buttonType: string) => {
    setError(""); // Clear previous errors
    setProcessingButton(buttonType);
    const result = formCreateSchema.safeParse({ buttonType, textareaValue });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setProcessingButton(null);
      return;
    }

    formMutation.mutate(buttonType, {
      onError: (error) => {
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while processing your request"
        );
        setProcessingButton(null);
      },
    });
  };

  const resetStates = () => {
    setTextareaValue("");
    setError("");
    setSuccess("");
    setProcessingButton(null);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) resetStates();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" /> Create Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form Manually or Ai Generate</DialogTitle>
          <DialogDescription>
            Choose between creating a form manually or letting AI generate one
            for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Enter your Idea to generate form.."
            className={(cn(error ? "border-red-500" : ""), "h-[200px]")}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              onClick={() => handleSubmit("Manually")}
              disabled={processingButton !== null || textareaValue !== ""}
            >
              {processingButton === "Manually"
                ? "Processing..."
                : "Create Manually"}
            </Button>
            <Button
              onClick={() => handleSubmit("Ai")}
              disabled={processingButton !== null}
            >
              {processingButton === "Ai" ? "Processing..." : "Ai Generate"}
              {processingButton === "Ai" && (
                <Sparkles className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
