import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PrimarySeparatorProps {
  className?: string;
  opacity?: number;
}

const PrimarySeparator = ({
  className,
  opacity = 20,
}: PrimarySeparatorProps) => {
  return (
    <div className={cn("mt-10", className)}>
      <Separator className={`bg-primary/${opacity}`} />
    </div>
  );
};

export default PrimarySeparator;
