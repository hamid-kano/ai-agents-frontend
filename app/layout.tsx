import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدونة تقنية بالذكاء الاصطناعي",
  description: "نظام وكلاء ذكيين لإدارة مدونة تقنية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
