"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNowStrict } from "date-fns";
import {
  ActivityIcon,
  EllipsisIcon,
  Globe,
  LockKeyholeIcon,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface FormItemProps {
  id: number;
  formId: string;
  name: string;
  published: boolean;
  createdAt: Date;
  responses: number;
  views: number;
  backgroundColor: string;
  primaryColor: string;
}

const FormItem = ({
  formId,
  name,
  published,
  createdAt,
  responses,
  views,
}: FormItemProps) => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push(`/dashboard/form/builder/${formId}`);
  }, [router, formId]);
  return (
    <div onClick={onClick} role="button" className="w-full h-auto ">
      <div className="w-full relative flex items-center justify-center ovverflow-hidden h-[150px] rounded-t-xl border border-gray-300 bg-gradient-to-b from-primary/10 to primary/10">
        <div className="w-36 absolute bottom-0 flex items-center flex-col px-4 pt-6 h-32 rounded-t-xl bg-white shadow-lg">
          <h5 className="text-sm font-medium mb-1 text-center text-gray-400 truncate block w-[200px]">
            {name}
          </h5>
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex items-center gap-1 mb-2">
              <Skeleton className="h-3 w-3 rounded-full shrink-0" />
              <Skeleton className="h-[11px] w-[75px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full py-0">
        <div className="flex w-full items-center justify-between py-1">
          <span className="text-sm flex items-center font-medium gap-2">
            {published ? (
              <Globe className="text-muted-foreground size-3 gap-2" />
            ) : (
              <LockKeyholeIcon className="text-muted-foreground size-3 gap-2" />
            )}
            {name}
          </span>
          <EllipsisIcon className="text-gray-700 size-4" />
        </div>
        <div className=" flex w-full border-t border-gray-300 items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex items-center gap-1 font-[14px]">
              {responses} <MessageSquare className="size-[14px] text-primary" />
            </span>
            <span className="text-muted-foreground flex items-center gap-1 font-[14px]">
              {views} <ActivityIcon className="size-[14px] text-primary" />
            </span>
          </div>
          <span className="text-muted-foreground flex items-center gap-1 font-[14px]">
            {formatDistanceToNowStrict(new Date(createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormItem;
