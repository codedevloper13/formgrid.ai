import { fetchForms } from "@/actions/form.actions";

import FormItem from "./FormItem";

interface Form {
  id: number;
  name: string;
  formId: string;
  published: boolean;
  createdAt: Date;
  responses: number;
  views: number;
  settings: {
    backgroundColor: string;
    primaryColor: string;
  };
}

interface FetchFormsResponse {
  success: boolean;
  message?: string;
  forms?: Form[];
}

const FormList = async () => {
  const response: FetchFormsResponse = await fetchForms();

  if (!response.success) {
    return <div className="text-center text-muted-foreground">Failed to load forms: {response.message}</div>;
  }

  return (
    <>
      {response.forms?.map((form) => (
        <FormItem
          key={form.id}
          id={form.id}
          formId={form.formId}
          name={form.name}
          published={form.published}
          createdAt={form.createdAt}
          responses={form.responses}
          views={form.views}
          backgroundColor={form.settings.backgroundColor}
          primaryColor={form.settings.primaryColor}
        />
      ))}
    </>
  );
};

export default FormList;
