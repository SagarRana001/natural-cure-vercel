import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Botanica | Organic Handmade Soap",
  description: "Traditional Ayurvedic handmade organic soaps including Kesar Chandan, Neem, Aloevera, and Multani Mitti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSerif.variable} font-sans`}
    >
      <body className="min-h-[100dvh] flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
