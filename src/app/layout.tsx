import type { Metadata } from "next";
import "./globals.css";
import LayoutContent from "@/components/layout/LayoutContent";

export const metadata: Metadata = {
  title: "Hillside CRM Portal",
  description: "Hillside CRM Portal - Müşteri İlişkileri Yönetimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
