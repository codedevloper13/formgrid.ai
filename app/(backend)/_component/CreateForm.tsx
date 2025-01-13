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
import { toast } from "sonner";

const CreateForm = () => {
  const router = useRouter();
  const [textareaValue, setTextareaValue] = useState("");
  const [error, setError] = useState("");
  const [processingButton, setProcessingButton] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const formMutation = useMutation({
    mutationFn: async (buttonType: string) => {
      const response = await submitForm(buttonType, textareaValue);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Form created successfully!");
      setTextareaValue("");
      setIsOpen(false);
      if (data?.id) {
        router.refresh(); // Refresh the current page
        router.push(`/form-edit/${data.id}`);
      }
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "Failed to create form");
      toast.error(error instanceof Error ? error.message : "Failed to create form");
    },
    onSettled: () => {
      setProcessingButton(null);
    },
  });

  const handleSubmit = async (buttonType: string) => {
    setError("");
    setProcessingButton(buttonType);

    try {
      const result = formCreateSchema.safeParse({ buttonType, textareaValue });
      if (!result.success) {
        setError(result.error.errors[0].message);
        setProcessingButton(null);
        return;
      }

      formMutation.mutate(buttonType);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setProcessingButton(null);
    }
  };

  const resetStates = () => {
    setTextareaValue("");
    setError("");
    setProcessingButton(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetStates();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Sparkles className="mr-2 h-4 w-4" /> Create Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form Manually or AI Generate</DialogTitle>
          <DialogDescription>
            Choose between creating a form manually or letting AI generate one
            for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Enter your idea to generate form..."
            className={cn("h-[200px]", error && "border-red-500")}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              onClick={() => handleSubmit("Manually")}
              disabled={processingButton !== null || textareaValue !== ""}
            >
              {processingButton === "Manually" ? "Processing..." : "Create Manually"}
            </Button>
            <Button
              onClick={() => handleSubmit("Ai")}
              disabled={processingButton !== null}
            >
              {processingButton === "Ai" ? "Processing..." : "AI Generate"}
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
