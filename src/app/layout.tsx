import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";

const comfortaa = localFont({
  src: "./fonts/Comfortaa-VariableFont_wght.ttf",
  variable: "--font-comfortaa",
  weight: "100 900",
});

const outfit = localFont({
  src: "./fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "aconews | Never miss a beat",
  description: "aconews is a news aggregator.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          comfortaa.variable,
          outfit.variable,
        )}
      >
        <Providers>
          <main className="relative flex flex-col min-h-[calc(100dvh)] font-outfit">
            <Navbar />
            <div className="flex-1 flex-grow h-[calc(100dvh-88px) md:h-[calc(100dvh-68px)]">
              {children}
            </div>
          </main>
        </Providers>

        {/* <Toaster position="top-center" richColors /> */}
      </body>
    </html>
  );
}
