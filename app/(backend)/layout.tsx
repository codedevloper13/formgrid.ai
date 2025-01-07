import Sidebar from "@/components/sidebar";

export default function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen">
      <main className="flex-1">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
