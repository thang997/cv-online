import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack / .NET Developer — Portfolio",
  description:
    "Lập trình viên fullstack .NET với hơn 5 năm kinh nghiệm xây dựng hệ thống phân tán, hiệu năng cao. Fullstack .NET developer with 5+ years building distributed, high-performance systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
