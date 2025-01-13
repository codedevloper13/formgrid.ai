import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData, FormField } from "@/types/form";
import FieldEdit from "./FieldEdit";
import { useState } from "react";

interface FormUIProps {
  JsonFromdata: FormData;
}

const FormUI = ({ JsonFromdata }: FormUIProps) => {
  const [formData, setFormData] = useState<FormData>(JsonFromdata);

  const handleFieldUpdate = (updatedField: FormField, index: number) => {
    const newFields = [...formData.jsonform.fields];
    newFields[index] = updatedField;
    setFormData({
      ...formData,
      jsonform: {
        ...formData.jsonform,
        fields: newFields,
      },
    });
  };

  const handleFieldDelete = (index: number) => {
    const newFields = formData.jsonform.fields.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      jsonform: {
        ...formData.jsonform,
        fields: newFields,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 grainy">
      <div className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md">
          <div className="p-6 md:p-8">
            <Card className="border-none shadow-none bg-white">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl font-bold">
                  Form Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-2.5">
                      Form Title
                    </Label>
                    <Input
                      value={formData?.formHeading || ""}
                      className="text-lg font-medium border-2 focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter form title"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold mb-2.5">
                      Description
                    </Label>
                    <Textarea
                      className="min-h-[120px] resize-none border-2 focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter form description"
                      defaultValue={formData?.description || ""}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Form Fields</h3>
                  <div className="space-y-6">
                    {formData?.jsonform?.fields?.map((field, index) => (
                      <div
                        key={`${field.fieldName}_${index}`}
                        className="bg-gray-50/50 p-6 rounded-lg border-2 border-gray-100 hover:border-primary/20 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">
                              {field?.label}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                            <FieldEdit
                              field={field}
                              onUpdate={(updatedField) =>
                                handleFieldUpdate(updatedField, index)
                              }
                              onDelete={() => handleFieldDelete(index)}
                            />
                          </div>

                          {field.fieldType === "select" ? (
                            <Select name={field?.fieldName}>
                              <SelectTrigger
                                className={cn(
                                  `${index}-${formData.id}`,
                                  "w-full border-2 focus:ring-2 focus:ring-primary/20"
                                )}
                              >
                                <SelectValue
                                  placeholder={
                                    field?.placeholder || "Select an option"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option, optionIndex) => (
                                  <SelectItem
                                    key={`${option}_${optionIndex}`}
                                    value={option}
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : field.fieldType === "radio" ? (
                            <RadioGroup
                              defaultValue={field.options?.[0]}
                              name={field?.fieldName}
                              className="space-y-3"
                            >
                              {field.options?.map((option, optionIndex) => (
                                <div
                                  key={`${option}_${optionIndex}`}
                                  className="flex items-center space-x-3"
                                >
                                  <RadioGroupItem
                                    value={option}
                                    id={`${field.fieldName}-${option}`}
                                    className={cn(
                                      `${index}-${formData.id}`,
                                      "border-2"
                                    )}
                                  />
                                  <Label
                                    htmlFor={`${field.fieldName}-${option}`}
                                    className="text-sm"
                                  >
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          ) : field.fieldType === "checkbox" ? (
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={`${field.fieldName}-${index}`}
                                name={field?.fieldName}
                                className={cn(
                                  `${index}-${formData.id}`,
                                  "border-2"
                                )}
                              />
                              <Label
                                htmlFor={`${field.fieldName}-${index}`}
                                className="text-sm"
                              >
                                {field.label}
                              </Label>
                            </div>
                          ) : field.fieldType === "textarea" ? (
                            <Textarea
                              className={cn(
                                `${index}-${formData.id}`,
                                "w-full min-h-[120px] border-2 focus:ring-2 focus:ring-primary/20"
                              )}
                              placeholder={field?.placeholder}
                              name={field?.fieldName}
                            />
                          ) : (
                            <Input
                              type={field?.fieldType}
                              placeholder={field?.placeholder}
                              className={cn(
                                `${index}-${formData.id}`,
                                "w-full border-2 focus:ring-2 focus:ring-primary/20"
                              )}
                              name={field?.fieldName}
                            />
                          )}

                          {field.required && field.validation?.errorMessage && (
                            <p className="text-sm text-red-500 mt-1">
                              {field.validation.errorMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUI;
