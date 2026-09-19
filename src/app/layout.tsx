import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle SQL Exam Review | SETEC Institute Year III",
  description: "EdTech review platform for Oracle Database SQL — comprehensive preparation covering Group Functions, Joins, Subqueries, Set Operators, DML, DDL, and Naming Conventions.",
  keywords: [
    "Oracle SQL",
    "SETEC Institute",
    "Exam Review",
    "Group Functions",
    "Joins",
    "Subqueries",
    "Set Operators",
    "DML",
    "DDL"
  ],
  authors: [{ name: "SETEC Institute" }],
};

export const viewport: Viewport = {
  themeColor: "#0F2552",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
