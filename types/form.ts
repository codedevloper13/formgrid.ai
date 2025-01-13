export interface FormValidation {
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  errorMessage?: string;
}

export interface FormField {
  label: string;
  required: boolean;
  fieldName: string;
  fieldType: string;
  fieldTitle?: string;
  validation?: FormValidation;
  placeholder?: string;
  options?: string[];
}

export interface JsonFormData {
  fields: FormField[];
}

export type Form = {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description: string | null;
  formHeading: string | null;
  jsonform: JsonFormData;
  status: string;
  submissions: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormData {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description?: string;
  formHeading?: string;
  jsonform: JsonFormData;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
