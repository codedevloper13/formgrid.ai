'use server';

import { chatSession } from '@/config/AiModal';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function submitForm(buttonType: string, textareaValue: string) {
  try {
    // Add your server-side logic here
    if (buttonType === 'Manually' && textareaValue === "") {
      const title = "Untitled Form";
      const form = await prisma.forms.create({
        data: {
          title,
          slug: createSlug(title),
          description: "Untitled Description",
          jsonform: {}
        }
      });
      return {
        success: true,
        data: form
      };
    }

    if (buttonType === 'Ai') {
      if (!textareaValue.trim()) {
        throw new Error("Please provide an idea for AI form generation");
      }
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
      
      const result = await chatSession.sendMessage(textareaValue + PROMPT);
      
      if (!result) {
        throw new Error("Failed to generate form");
      }

      try {
        // Get the response text using the text() function
        const responseText = await result.response.text();
        console.log("Raw response:", responseText);

        // Clean the response text
        const cleanResponse = responseText
          .replace(/```json\n?|\n?```/g, '') // Remove markdown code blocks
          .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes
          .replace(/[\u2018\u2019]/g, "'") // Replace smart single quotes
          .replace(/\\n/g, '') // Remove newline escapes
          .replace(/\\"/g, '"') // Fix escaped quotes
          .trim();
        const parsedForm = JSON.parse(cleanResponse);
        
        // Validate the form structure
        if (!parsedForm.formTitle || !parsedForm.formHeading || !Array.isArray(parsedForm.fields)) {
          throw new Error("Invalid form structure: missing required fields");
        }
        
        const form = await prisma.forms.create({
          data: {
            title: parsedForm.formTitle || "AI Generated Form",
            slug: createSlug(parsedForm.formTitle || "ai-generated-form"),
            description: parsedForm.formDescription || 'Untitled Description',
            jsonform: parsedForm
          }
        });
        
        return {
          success: true,
          data: form
        };
      } catch (error: unknown) {
        console.log("Error in ai form generation: " + (error instanceof Error ? error.message : String(error)));
        console.error('Error details:', {
          error,
          response: result.response
        });
        console.log('error here 1');
        throw new Error('Failed to parse AI generated form: ' + (error instanceof Error ? error.message : String(error)));
      }
    }

    throw new Error("Invalid button type");

    // Revalidate the forms page
    revalidatePath('/forms');
    
    // Return the processed data
  
  } catch (error) {
    console.error('Server error:', error);
    throw new Error('Failed to process form data');
  }
}

export async function getFormById(formId: string) {
  try {
    const form = await prisma.forms.findUnique({
      where: {
        id: formId,
      },
    });

    if (!form) {
      throw new Error('Form not found');
    }

    return {
      success: true,
      data: form
    };
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
}

export async function getForms(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const [forms, total] = await Promise.all([
      prisma.forms.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.forms.count(),
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
