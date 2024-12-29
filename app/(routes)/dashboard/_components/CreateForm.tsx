import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const CreateForm = () => {
  return (
    <Button variant="default" size="lg" className="gap-2">
      <PlusIcon className="h-5 w-5" />
      Create a form
    </Button>
  );
};
export default CreateForm;
