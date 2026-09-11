import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Intention - AI SEO Content Planner & SERP Intelligence",
  description:
    "Transform keywords into actionable, intent-driven SEO content plans powered by Gemini 3.6 & Live SERP Analysis.",
  keywords: [
    "SEO Planner",
    "AI Content Strategy",
    "SERP Analysis",
    "Content Intelligence",
  ],
  authors: [{ name: "M. Faridh Maulana" }],
  openGraph: {
    title: "Intention — AI SEO Content Planner",
    description:
      "Transform raw search keywords into intent-focused content plans in seconds.",
    type: "website",
    siteName: "Intention AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col relative`}
      >
        <AuroraBackground />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
