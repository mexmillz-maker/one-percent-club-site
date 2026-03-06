import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The One Percent Club Prototype",
  description: "A responsive front-end prototype for the One Percent Club website rebrand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
