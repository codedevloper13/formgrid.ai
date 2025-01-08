import Sidebar from "@/components/sidebar";

export default function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
