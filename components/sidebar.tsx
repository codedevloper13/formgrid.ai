"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  // Convert path to breadcrumb segments
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      title: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: `/${segment}`,
    }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => (
                  <>
                    <BreadcrumbItem
                      key={segment.href}
                      className="hidden md:block"
                    >
                      {index === segments.length - 1 ? (
                        <BreadcrumbPage>{segment.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={segment.href}>
                          {segment.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < segments.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
