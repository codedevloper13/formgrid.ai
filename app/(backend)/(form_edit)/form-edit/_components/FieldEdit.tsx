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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FieldEditProps {
  field: FormField;
  onUpdate: (updatedField: FormField) => void;
  onDelete: () => void;
}

const FieldEdit = ({ field, onUpdate, onDelete }: FieldEditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedField, setEditedField] = useState<FormField>(field);

  const handleUpdate = () => {
    onUpdate(editedField);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
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
              Make changes to your form field here. Click save when you&apos;re
              done.
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
                  setEditedField({
                    ...editedField,
                    placeholder: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="required"
                checked={editedField.required}
                onCheckedChange={(checked) => {
                  // Preserve the original field's validation message
                  const validation = checked
                    ? { errorMessage: field.validation?.errorMessage || "This field is required" }
                    : undefined;
                    
                  setEditedField({
                    ...editedField,
                    required: checked,
                    validation,
                  });
                }}
              />
              <Label htmlFor="required">Required Field</Label>
            </div>
            {editedField.required && (
              <div className="grid gap-2">
                <Label htmlFor="validationMessage">Error Message</Label>
                <Input
                  id="validationMessage"
                  placeholder="e.g., This field is required"
                  value={editedField.validation?.errorMessage || ""}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      validation: {
                        ...editedField.validation,
                        errorMessage: e.target.value,
                      },
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  This message will be shown when the field is left empty
                </p>
              </div>
            )}
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
                          setEditedField({
                            ...editedField,
                            options: newOptions,
                          });
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newOptions = editedField.options?.filter(
                            (_, i) => i !== index
                          );
                          setEditedField({
                            ...editedField,
                            options: newOptions,
                          });
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
            <Button 
              variant="destructive" 
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Field
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the field
              &quot;{editedField.label}&quot; from your form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
};

export default FieldEdit;
