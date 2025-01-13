import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { FormData } from "@/types/form";

interface FormUIProps {
  JsonFromdata: FormData;
}

const FormUI = ({ JsonFromdata }: FormUIProps) => {
  return (
    <div>
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
                      <p className="text-sm font-medium text-muted-foreground mb-4">
                        Form title
                      </p>
                      <div className="space-y-2 mb-6">
                        <Input
                          value={JsonFromdata?.formHeading || ""}
                          className="text-lg font-medium"
                          placeholder="Enter form title"
                        />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Description
                      </p>
                      <div className="mb-8">
                        <Textarea
                          className="min-h-[100px] resize-none"
                          placeholder="Enter form description"
                          defaultValue={JsonFromdata?.description || ""}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-4">
                        Form Fields
                      </h3>
                      <div className="space-y-6">
                        {JsonFromdata?.jsonform?.fields?.map((field, index) => (
                          <div
                            key={`${field.fieldName}_${index}`}
                            className="my-3"
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {field?.label}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {field.fieldType === "select" ? (
                              <Select name={field?.fieldName}>
                                <SelectTrigger
                                  className={cn(
                                    `${index}-${JsonFromdata.id}`,
                                    "w-full"
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
                                className="space-y-2"
                              >
                                {field.options?.map((option, optionIndex) => (
                                  <div
                                    key={`${option}_${optionIndex}`}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option}
                                      id={`${field.fieldName}-${option}`}
                                      className={cn(
                                        `${index}-${JsonFromdata.id}`
                                      )}
                                    />
                                    <Label
                                      htmlFor={`${field.fieldName}-${option}`}
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            ) : field.fieldType === "checkbox" ? (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${field.fieldName}-${index}`}
                                  name={field?.fieldName}
                                  className={cn(`${index}-${JsonFromdata.id}`)}
                                />
                                <Label
                                  htmlFor={`${field.fieldName}-${index}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {field.label}
                                </Label>
                              </div>
                            ) : field.fieldType === "textarea" ? (
                              <div className="flex items-center space-x-2">
                                {/* <Checkbox
                                  id={`${field.fieldName}-${index}`}
                                  name={field?.fieldName}
                                  className={cn(`${index}-${JsonFromdata.id}`)}
                                /> */}
                                <Textarea
                                  className={cn(
                                    `${index}-${JsonFromdata.id}`,
                                    "w-full"
                                  )}
                                  placeholder={field?.placeholder}
                                  name={field?.fieldName}
                                />
                              </div>
                            ) : (
                              <Input
                                type={field?.fieldType}
                                placeholder={field?.placeholder}
                                className={cn(
                                  `${index}-${JsonFromdata.id}`,
                                  "w-full"
                                )}
                                name={field?.fieldName}
                              />
                            )}

                            {field.validation?.errorMessage && (
                              <p className="text-xs text-red-500 mt-1">
                                {field.validation.errorMessage}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
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
  );
};
export default FormUI;
