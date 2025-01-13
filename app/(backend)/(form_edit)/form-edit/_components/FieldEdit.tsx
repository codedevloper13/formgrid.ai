import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/types/form";
import { useState } from "react";

interface FieldEditProps {
  field: FormField;
  onUpdate: (updatedField: FormField) => void;
  onDelete: () => void;
}

const FieldEdit = ({ field, onUpdate, onDelete }: FieldEditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedField, setEditedField] = useState<FormField>(field);

  const handleUpdate = () => {
    onUpdate(editedField);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="w-4 h-4 text-gray-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
            <DialogDescription>
              Make changes to your form field here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="label">Field Label</Label>
              <Input
                id="label"
                value={editedField.label}
                onChange={(e) =>
                  setEditedField({ ...editedField, label: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={editedField.fieldType}
                onValueChange={(value) =>
                  setEditedField({ ...editedField, fieldType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="tel">Phone</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={editedField.placeholder || ""}
                onChange={(e) =>
                  setEditedField({ ...editedField, placeholder: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="required"
                checked={editedField.required}
                onCheckedChange={(checked) =>
                  setEditedField({
                    ...editedField,
                    required: checked,
                    validation: checked ? editedField.validation : undefined
                  })
                }
              />
              <Label htmlFor="required">Required Field</Label>
            </div>
            {(editedField.fieldType === "select" ||
              editedField.fieldType === "radio") && (
              <div className="grid gap-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {editedField.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(editedField.options || [])];
                          newOptions[index] = e.target.value;
                          setEditedField({ ...editedField, options: newOptions });
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newOptions = editedField.options?.filter(
                            (_, i) => i !== index
                          );
                          setEditedField({ ...editedField, options: newOptions });
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      setEditedField({
                        ...editedField,
                        options: [...(editedField.options || []), ""],
                      })
                    }
                  >
                    Add Option
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button variant="destructive" onClick={onDelete}>
              Delete Field
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onDelete}
      >
        <Trash className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
};

export default FieldEdit;
