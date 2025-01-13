'use server';

import { chatSession } from '@/config/AiModal';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/prisma/database';
import { FormField } from '@/types/form';

interface FormResponse<T = Form> {
  success: boolean;
  data?: T;
  error?: string;
}

interface JsonFormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface JsonForm {
  fields: JsonFormField[];
  settings?: {
    submitButtonText?: string;
    theme?: string;
    layout?: string;
  };
}

interface Form {
  id: string;
  title: string;
  description: string | null;
  formHeading: string | null;
  status: string;
  jsonform: JsonForm | null;
  slug: string;
  userId: string;
  submissions?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetFormsResponse {
  forms: Form[];
  total: number;
  page: number;
  limit: number;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateAiForm(description: string) {
  const PROMPT = `Based on the provided requirement, create a professional form structure adhering to these specifications:

    1. Core Form Structure Requirements:
      {
        "formTitle": "Concise, professional title (max 60 chars)",
        "formHeading": "Clear, descriptive heading (max 120 chars)",
        "formDescription": "Clear, descriptive desction abot the form (max 300 chars)",
        "fields": [Array of form fields]
      }

    2. Each Field Must Include:
      - fieldName: camelCase identifier (e.g., "userEmail", "phoneNumber")
      - fieldTitle: Human-readable title (e.g., "Email Address", "Contact Number")
      - fieldType: One of the following:
        * "text" - For general text input
        * "email" - For email addresses with validation
        * "password" - For secure password input
        * "number" - For numeric values only
        * "tel" - For telephone numbers
        * "date" - For date selection
        * "textarea" - For multi-line text
        * "select" - For dropdown selection
        * "radio" - For single choice from options
        * "checkbox" - For multiple selections
        * "url" - For website URLs
      - placeholder: Helpful example text
      - label: Clear field description
      - required: true/false (mark essential fields as true)
      - options: Array of choices for select/radio/checkbox
      - validation: {
          minLength: Minimum characters/value
          maxLength: Maximum characters/value
          pattern: Regex pattern for validation
          errorMessage: Custom error message
        }

    3. Implementation Guidelines:
      - Group related fields logically
      - Use appropriate field types for data collection
      - Add clear validation rules for data integrity
      - Include helpful placeholder text
      - Keep labels concise yet descriptive
      - Ensure proper error messages
      - Follow accessibility best practices

    Expected JSON Structure:
    {
      "formTitle": "string (max 60 chars)",
      "formHeading": "string (max 120 chars)",
      "fields": [
        {
          "fieldName": "camelCaseIdentifier",
          "fieldTitle": "Professional Field Title",
          "fieldType": "email|password|text|number|tel|date|textarea|select|radio|checkbox|url",
          "placeholder": "Example: Enter your work email",
          "label": "Clear Field Description",
          "required": boolean,
          "options": ["Option 1", "Option 2"],
          "validation": {
            "minLength": number,
            "maxLength": number,
            "pattern": "regex pattern",
            "errorMessage": "User-friendly error message"
          }
        }
      ]
    }
    Please note: Please Return a clean, valid JSON object following this structure without any additional text or explanations.`;

  try {
    console.log("Sending AI request with description:", description);
    const result = await chatSession.sendMessage("Description:" + description + PROMPT);
    
    if (!result?.response) {
      throw new Error("Failed to generate form: AI response was invalid");
    }

    const responseText = await result.response.text();
    if (!responseText) {
      throw new Error("AI response was empty");
    }

    console.log("Raw AI response:", responseText);
    const parsedForm = JSON.parse(responseText);
    console.log("Parsed form:", parsedForm);

    // Ensure the form structure is valid
    if (!parsedForm || typeof parsedForm !== 'object') {
      throw new Error("Invalid form structure: parsed result is not an object");
    }

    if (!parsedForm.formTitle || !parsedForm.formHeading || !Array.isArray(parsedForm.fields)) {
      throw new Error("Invalid form structure: missing required fields");
    }

    // Clean and validate each field
    parsedForm.fields = parsedForm.fields.map((field: FormField) => ({
      ...field,
      validation: {
        ...field.validation,
        pattern: field.validation?.pattern || null
      }
    }));

    return parsedForm;
  } catch (error) {
    console.error("Error in generateAiForm:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function submitForm(buttonType: string, textareaValue: string): Promise<FormResponse<Form>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized: User must be logged in" };
    }

    // Check if user exists in database
    const existingUser = await db.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      // Create user if doesn't exist
      try {
        await db.user.create({
          data: { id: userId }
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user profile" };
      }
    }

    let formData;

    if (buttonType === 'Manually') {
      if (textareaValue !== "") {
        return { success: false, error: "Manual form creation doesn't accept text input" };
      }
      formData = {
        title: "Untitled Form",
        description: "Untitled Description",
        formHeading: "Untitled Form",
        status: "draft",
        jsonform: { fields: [] }, 
      };
    } else if (buttonType === 'Ai') {
      if (!textareaValue.trim()) {
        return { success: false, error: "Please provide an idea for AI form generation" };
      }
      
      try {
        const aiForm = await generateAiForm(textareaValue);
        
        // Deep clone and clean the form data
        const cleanForm = {
          formTitle: aiForm.formTitle,
          formHeading: aiForm.formHeading,
          formDescription: aiForm.formDescription,
          fields: aiForm.fields.map((field: FormField) => ({
            fieldName: field.fieldName,
            fieldTitle: field.fieldTitle,
            fieldType: field.fieldType,
            placeholder: field.placeholder,
            label: field.label,
            required: Boolean(field.required),
            options: Array.isArray(field.options) ? field.options : [],
            validation: {
              minLength: field.validation?.minLength || null,
              maxLength: field.validation?.maxLength || null,
              pattern: field.validation?.pattern || null,
              errorMessage: field.validation?.errorMessage || ''
            }
          }))
        };

        formData = {
          title: cleanForm.formTitle || "AI Generated Form",
          description: cleanForm.formDescription || 'Untitled Description',
          formHeading: cleanForm.formHeading || cleanForm.formTitle || "AI Generated Form",
          status: "draft",
          jsonform: { fields: cleanForm.fields }, 
        };
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to generate AI form'
        };
      }
    } else {
      return { success: false, error: "Invalid button type" };
    }

    // Create the form in the database
    const slug = createSlug(formData.title);
    const data = {
      ...formData,
      slug,
      userId,
    };

    try {
      const form = await db.form.create({ data });

      return { 
        success: true, 
        data: {
          id: form.id,
          title: form.title,
          description: form.description,
          formHeading: form.formHeading,
          status: form.status,
          jsonform: isJsonForm(form.jsonform) ? form.jsonform : null,
          slug: form.slug,
          userId: form.userId
        } 
      };
    } catch (dbError) {
      console.error("Database error:", dbError instanceof Error ? dbError.message : String(dbError));
      return { 
        success: false, 
        error: 'Failed to save form to database. Please try again.'
      };
    }
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : String(error));
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.'
    };
  }
}

function isJsonForm(json: unknown): json is JsonForm {
  return typeof json === 'object' && json !== null && 'fields' in json;
}

export async function getFormById(formId: string): Promise<FormResponse<Form>> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "Unauthorized: User must be logged in" };
    }

    const form = await db.form.findUnique({
      where: {
        id: formId,
        userId: userId
      }
    });

    if (!form) {
      return { success: false, error: 'Form not found' };
    }

    // Parse the jsonform field if it exists
    const formData: Form = {
      ...form,
      jsonform: isJsonForm(form.jsonform) ? form.jsonform : null
    };

    return {
      success: true,
      data: formData
    };
  } catch (error) {
    console.error('Server error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch form'
    };
  }
}

export async function getForms(page: number = 1, limit: number = 10): Promise<GetFormsResponse> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized: User must be logged in");
    }

    const skip = (page - 1) * limit;

    const [forms, total] = await Promise.all([
      db.form.findMany({
        where: {
          userId: userId
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }).then(forms => forms.map(form => ({
        ...form,
        jsonform: isJsonForm(form.jsonform) ? form.jsonform : null
      }))),
      db.form.count({
        where: {
          userId: userId
        }
      }),
    ]);

    return {
      forms,
      total,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw new Error("Failed to fetch forms");
  }
}

export async function deleteForm(formId: string): Promise<FormResponse<Form>> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "Unauthorized: User must be logged in" };
    }

    const form = await db.form.findUnique({
      where: {
        id: formId,
        userId: userId
      }
    });

    if (!form) {
      return { success: false, error: "Form not found or unauthorized" };
    }

    // Ensure jsonform is properly typed before returning
    const formData: Form = {
      ...form,
      jsonform: isJsonForm(form.jsonform) ? form.jsonform : null
    };

    await db.form.delete({
      where: {
        id: formId
      }
    });

    return { success: true, data: formData };
  } catch (error) {
    console.error("Error deleting form:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete form'
    };
  }
}
