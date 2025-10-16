import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { AccessibilityControls } from "@/components/accessibility/AccessibilityControls";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VeryGoodMelon.Fun - Thoughtful Games to Reduce Anxiety",
  description: "Creative, accessible, AI-powered games designed to help you relax. No ads, no accounts, no stress - just thoughtful experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
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
              <p>Made with purpose. Every pixel has meaning.</p>
              <p>© 2025 VeryGoodMelon.Fun</p>
            </div>
          </div>
        </footer>
        <AccessibilityControls />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
