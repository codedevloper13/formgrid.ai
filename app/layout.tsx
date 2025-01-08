import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "FormGrid.ai",
  description: "FormGrid.ai is a tool for creating forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}, antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
