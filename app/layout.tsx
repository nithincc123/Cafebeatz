import type { Metadata } from "next";
import { Jost, Alex_Brush } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import { LanguageProvider } from "./context/LanguageContext";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
});

export const metadata: Metadata = {
  title: "Cafe Beatz",
  description: "1920s Coffeehouse Culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${alexBrush.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
