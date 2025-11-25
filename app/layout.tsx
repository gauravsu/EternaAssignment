import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "Axiom Trade - Professional Token Discovery",
  description:
    "Real-time token discovery and analytics platform for professional traders.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
