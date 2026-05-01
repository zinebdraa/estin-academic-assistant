// app/layout.tsx
import type { Metadata } from "next";
import { ProfileProvider } from "@/contexts/ProfileContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESTIN Academic Assistant",
  description: "AI-powered academic assistant for Algerian university students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}