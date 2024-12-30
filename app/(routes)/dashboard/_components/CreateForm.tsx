"use client";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateFormSchema } from "@/schema/form.schema";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"
import { createForm } from "@/actions/form.actions";

const CreateForm = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CreateFormSchema>) => {
    // Do something with the form values.
    // This will be type-safe and validated.
    
      const response = await createForm({
        name: values.name,
        description: values.description,
      });
      if(response.success) {
        setIsOpen(false);
          form.reset();
          toast({
            title: "Form created",
            description: "Your form has been created successfully",
          });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
  }
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="default" size="lg" className="gap-2 !bg-primary">
            <PlusIcon className="h-5 w-5" />
            Create a form
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Create a New Form</SheetTitle>
            <SheetDescription>
              This will create a new form.ensure to save your form before
              creating a new one.
            </SheetDescription>
          </SheetHeader>
          <div className="w-full dialog-content">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Form title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Form description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="px-5 flex place-self-end"
                >
                  {form.formState.isSubmitting && (
                    <Loader className="w-4 h-4 animated-spin" />
                  )}
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default CreateForm;
