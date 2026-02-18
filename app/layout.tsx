import type { Metadata } from "next";
import { Tajawal } from 'next/font/google';
import "./globals.css";

const tajawal = Tajawal({ 
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['arabic'],
  display: 'swap',
});

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
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
