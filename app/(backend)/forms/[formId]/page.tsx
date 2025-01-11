"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "@/server_action/form_submit_actions";

export default function FormPage() {
  const params = useParams();
  const formId = params.formId as string;

  const { data: formData, isLoading, error } = useQuery({
    queryKey: ['form', formId],
    queryFn: () => getFormById(formId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const form = formData?.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{form?.title || 'Form'}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-gray-600">{form?.description}</p>
        </div>
        {/* Form content will be rendered here */}
        <pre className="bg-gray-50 p-4 rounded">
          {JSON.stringify(form?.jsonform, null, 2)}
        </pre>
      </div>
    </div>
  );
}
