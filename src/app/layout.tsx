import "./globals.css";
import "../sentry"; // initialize Sentry if DSN provided
import { ReactNode } from "react";

export const metadata = {
  title: "Supekar Electronics",
  description: "Automation • IoT • Electronics Manufacturing",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}