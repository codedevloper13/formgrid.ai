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

const CreateForm = () => {
  const [textareaValue, setTextareaValue] = useState("");

  const FormData = (buttonType: string) => {
    console.log(buttonType);
  };

  return (
    <Dialog>
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
            <Textarea
              placeholder="Enter your Idea to generate form.."
              className="mt-3 h-[200px]"
              onChange={(e) => {
                setTextareaValue(e.target.value);
              }}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              onClick={() => FormData("Manually")}
              disabled={textareaValue !== ""}
            >
              Create Manually
            </Button>
            <Button onClick={() => FormData("Ai")}>Ai Generate</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
