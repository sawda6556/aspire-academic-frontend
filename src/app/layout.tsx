import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aspire Academic Co. | Safe, Professional Islamic-Friendly Tutoring",
  description: "Connect with verified tutors for safe, professional, and Islamic-friendly online education. High-quality tutoring for UK students.",
  keywords: ["Islamic tutoring", "online tutoring UK", "safe education", "verified tutors", "academic support"],
  authors: [{ name: "Aspire Academic Co." }],
  openGraph: {
    title: "Aspire Academic Co. | Safe, Professional Islamic-Friendly Tutoring",
    description: "Connect with verified tutors for safe, professional, and Islamic-friendly online education.",
    url: "https://aspireacademicco.co.uk",
    siteName: "Aspire Academic Co.",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://aspireacademicco.co.uk/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Aspire Academic Co. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspire Academic Co. | Safe, Professional Islamic-Friendly Tutoring",
    description: "Connect with verified tutors for safe, professional, and Islamic-friendly online education.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
