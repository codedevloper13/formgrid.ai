/**
 * The above functions validate and transform form data in TypeScript, ensuring it conforms to a
 * specific JSON structure.
 * @param {unknown} data - The `isValidJsonFormData` function checks if the provided data conforms to
 * the structure of a `JsonFormData` object. It verifies that the data is an object with an array
 * property named `fields`, where each field in the array has specific properties like `label`,
 * `required`, `fieldName`, and
 * @returns The `validateAndTransformFormData` function returns either a `FormData` object or `null`.
 * If the input `form` is not a valid JSON form data structure, it logs an error message and returns
 * `null`. If the input `form` is valid, it transforms the `jsonform` property into a `JsonFormData`
 * type and returns a new object with the `description` property preserved
 */
import { FormData, JsonFormData } from "@/types/form";

export function isValidJsonFormData(data: unknown): data is JsonFormData {
  if (!data || typeof data !== "object") return false;
  
  const jsonForm = data as JsonFormData;
  if (!Array.isArray(jsonForm.fields)) return false;

  return jsonForm.fields.every(field => (
    typeof field.label === "string" &&
    typeof field.required === "boolean" &&
    typeof field.fieldName === "string" &&
    typeof field.fieldType === "string"
  ));
}

export function validateAndTransformFormData(form: any): FormData | null {
  if (!form || typeof form !== "object") return null;

  if (!isValidJsonFormData(form.jsonform)) {
    console.error("Invalid form data structure");
    return null;
  }

  return {
    ...form,
    description: form.description || undefined,
    jsonform: form.jsonform as JsonFormData
  };
}
