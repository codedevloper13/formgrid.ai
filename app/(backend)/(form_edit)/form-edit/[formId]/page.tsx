"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "@/server_action/form_submit_actions";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Settings, Eye, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormUI from "../_components/FormUI";
import { validateAndTransformFormData } from "@/lib/utils/form-validator";

export default function FormPage() {
  const params = useParams();
  const formId = params.formId as string;

  const {
    data: formData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["form", formId],
    queryFn: () => getFormById(formId),
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-[200px] mb-6" />
        <div className="grid gap-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">
              Error:{" "}
              {error instanceof Error ? error.message : "Something went wrong"}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const form = formData?.data;

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Form Details Sidebar */}
      <div className="w-96 border-r bg-background shadow-sm">
        <div className="p-6">
          <Link href="/dashboard">
            <h2 className=" font-semibold flex items-center gap-2 hover:underline hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back
            </h2>
          </Link>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {form?.title || "Form"}
          </h2>
          <div className="space-y-2 mb-8">
            <Badge variant="outline" className="mr-2">
              {form?.status || "Draft"}
            </Badge>
            <Badge variant="secondary">ID: {formId}</Badge>
          </div>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#overview">
                <Eye className="mr-2 h-4 w-4" />
                Overview
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#responses">
                <MessageSquare className="mr-2 h-4 w-4" />
                Responses
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#share">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </a>
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {form && validateAndTransformFormData(form) && (
          <FormUI JsonFromdata={validateAndTransformFormData(form)!} />
        )}
      </div>
    </div>
  );
}
