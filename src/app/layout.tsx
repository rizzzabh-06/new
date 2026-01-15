import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Rishabh Raj Singh | Cybersecurity Portfolio",
    template: "%s | Rishabh Raj Singh",
  },
  description: "Cybersecurity Analyst & Computer Science Student. Specializing in Web Exploitation, Digital Forensics, and Red Teaming.",
  icons: {
    icon: '/profile.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased min-h-screen selection:bg-primary/30 selection:text-white`}
      >
        <Navigation />
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}

