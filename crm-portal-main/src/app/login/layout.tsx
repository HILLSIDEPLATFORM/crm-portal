import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Giriş - Hillside CRM Portal",
  description: "Hillside CRM Portal - Giriş Sayfası",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
