"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "@/server_action/form_submit_actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Settings, Eye, MessageSquare } from "lucide-react";

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
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="editor">Form Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Description
                        </h3>
                        <p className="text-sm">
                          {form?.description || "No description provided."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Form Schema
                        </h3>
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                          {JSON.stringify(form?.jsonform, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="editor">
                <Card>
                  <CardContent className="pt-6">
                    Form editor coming soon...
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardContent className="pt-6">
                    Form preview coming soon...
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
