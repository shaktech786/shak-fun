import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Shak.Fun - Thoughtful Games",
  description: "A relaxing collection of creative, pixelated games. No ads, no accounts, no distractions. Just play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen" role="main">
          {children}
        </main>
        <footer className="border-t border-card-border mt-20" role="contentinfo">
          <div className="container mx-auto px-6 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-light">
              <p>Made for good. 100% of proceeds support charitable causes.</p>
              <p>© 2025 Shak.Fun</p>
            </div>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
