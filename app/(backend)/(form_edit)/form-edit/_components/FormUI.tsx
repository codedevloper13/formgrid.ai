"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData, FormField } from "@/types/form";
import FieldEdit from "./FieldEdit";
import { useState } from "react";
import { GripVertical } from "lucide-react";
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { updateForm } from "@/server_action/form_submit_actions";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface SortableFieldProps {
  field: FormField;
  index: number;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
}

const SortableField = ({ field, index, onUpdate, onDelete }: SortableFieldProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${field.fieldName}_${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative transition-all duration-300 ease-out",
        isDragging ? "z-50 scale-105" : "hover:scale-[1.02]"
      )}
    >
      <div
        className={cn(
          "bg-gray-50/50 p-6 rounded-lg border-2 border-gray-100 hover:border-primary/20 transition-colors",
          isDragging && "border-primary shadow-lg"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                {...attributes}
                {...listeners}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  "hover:bg-primary/10 active:bg-primary/20",
                  "cursor-grab active:cursor-grabbing"
                )}
                type="button"
              >
                <GripVertical className="w-5 h-5 text-primary/70" />
              </button>
              <Label className="text-base font-medium">
                {field?.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
            <FieldEdit field={field} onUpdate={onUpdate} onDelete={onDelete} />
          </div>

          {field.fieldType === "select" ? (
            <Select name={field?.fieldName} defaultValue={field.options?.[0]}>
              <SelectTrigger
                className={cn(`${index}-${field.fieldName}`, "w-full border-2 focus:ring-2 focus:ring-primary/20")}
              >
                <SelectValue placeholder={field?.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, optionIndex) => (
                  <SelectItem key={`${option}_${optionIndex}`} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.fieldType === "radio" ? (
            <RadioGroup defaultValue={field.options?.[0]} name={field?.fieldName} className="space-y-3">
              {field.options?.map((option, optionIndex) => (
                <div key={`${option}_${optionIndex}`} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`${field.fieldName}-${option}`} className={cn("border-2")} />
                  <Label htmlFor={`${field.fieldName}-${option}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : field.fieldType === "checkbox" ? (
            <div className="flex items-center space-x-3">
              <Checkbox id={`${field.fieldName}-${index}`} name={field?.fieldName} className={cn("border-2")} />
              <Label htmlFor={`${field.fieldName}-${index}`} className="text-sm">
                {field.label}
              </Label>
            </div>
          ) : field.fieldType === "textarea" ? (
            <Textarea
              className={cn("w-full min-h-[120px] border-2 focus:ring-2 focus:ring-primary/20")}
              placeholder={field?.placeholder}
              name={field?.fieldName}
              defaultValue=""
            />
          ) : (
            <Input
              type={field?.fieldType}
              placeholder={field?.placeholder}
              className={cn("w-full border-2 focus:ring-2 focus:ring-primary/20")}
              name={field?.fieldName}
              defaultValue=""
            />
          )}

          {field.required && field.validation?.errorMessage && (
            <p className="text-sm text-red-500 mt-1">{field.validation.errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface FormUIProps {
  JsonFromdata: FormData;
}

const FormUI = ({ JsonFromdata }: FormUIProps) => {
  const [formData, setFormData] = useState<FormData>(JsonFromdata);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const formId = params.formId as string;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = formData.jsonform.fields.findIndex(
        (field, index) => `${field.fieldName}_${index}` === active.id
      );
      const newIndex = formData.jsonform.fields.findIndex((field, index) => `${field.fieldName}_${index}` === over.id);

      setFormData({
        ...formData,
        jsonform: {
          ...formData.jsonform,
          fields: arrayMove(formData.jsonform.fields, oldIndex, newIndex),
        },
      });
    }
  };

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

  const handleFormHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      formHeading: e.target.value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      description: e.target.value || undefined,
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateForm(formId, formData);
      await queryClient.invalidateQueries(["form", formId]);
      toast({
        title: "Success",
        description: "Form saved successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form" + error,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 grainy">
      <div className="sticky top-0 z-50 bg-background border-b py-3 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Edit Form</h1>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      <div className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md">
          <div className="p-6 md:p-8">
            <Card className="border-none shadow-none bg-white">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl font-bold">Form Details</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-2.5">Form Title</Label>
                    <Input
                      value={formData?.formHeading || ""}
                      onChange={handleFormHeadingChange}
                      className="text-lg font-medium border-2 focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter form title"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold mb-2.5">Description</Label>
                    <Textarea
                      className="min-h-[120px] resize-none border-2 focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter form description"
                      value={formData?.description || ""}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Form Fields</h3>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                      items={formData.jsonform.fields.map((field, index) => `${field.fieldName}_${index}`)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-6">
                        {formData?.jsonform?.fields?.map((field, index) => (
                          <SortableField
                            key={`${field.fieldName}_${index}`}
                            field={field}
                            index={index}
                            onUpdate={(updatedField) => handleFieldUpdate(updatedField, index)}
                            onDelete={() => handleFieldDelete(index)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
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
