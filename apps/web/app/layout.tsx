import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import GlobalHeader from "@/components/global/GlobalHeader";
import Footer from "@/components/global/Footer";
import LanguageBanner from "@/components/global/LanguageBanner";
import SearchPalette from "@/components/search/SearchPalette";
import ZingGuidePanel from "@/components/guide/ZingGuidePanel";
import { Suspense } from "react";
import "./globals.css";

/* ── FONT LOADING ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ── METADATA ── */
export const metadata: Metadata = {
  title: {
    default: "ZING — India's Knowledge Universe",
    template: "%s | ZING",
  },
  description:
    "India's most cinematic knowledge platform. Explore 7 universes of learning — from Science to History, Code to Careers — with AI-powered, visually stunning topic pages.",
  keywords: [
    "ZING",
    "knowledge platform",
    "India education",
    "learn science",
    "UPSC preparation",
    "coding tutorials",
    "interactive learning",
  ],
  authors: [{ name: "ZING Team" }],
  creator: "ZING",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://zing-alpha.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ZING",
    title: "ZING — India's Knowledge Universe",
    description:
      "Explore 7 universes of learning with AI-powered, cinematic topic pages.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZING — India's Knowledge Universe",
    description:
      "Explore 7 universes of learning with AI-powered, cinematic topic pages.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    { rel: "icon", url: "/favicon.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon-192.png" },
    { rel: "icon", url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    { rel: "icon", url: "/icon-512.png", type: "image/png", sizes: "512x512" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── ROOT LAYOUT ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${notoDevanagari.variable}`}
    >
      <body style={{ paddingTop: 'var(--header-height)' }}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <GlobalHeader />
        <Suspense fallback={null}>
          <LanguageBanner />
        </Suspense>
        <div id="main-content">{children}</div>
        <Footer />
        <SearchPalette />
        <ZingGuidePanel />
      </body>
    </html>
  );
}
