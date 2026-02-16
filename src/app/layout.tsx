import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F3' },
    { media: '(prefers-color-scheme: dark)', color: '#050507' },
  ],
};

export const metadata: Metadata = {
  title: "Nicolás García - Portafolio",
  description: "Ingeniero de software especializado en backend, automatización y soluciones empresariales",
  metadataBase: new URL('https://nicolasgarcia.dev'),
  openGraph: {
    title: "Nicolás García - Software Engineer",
    description: "Ingeniero de software especializado en backend, automatización y soluciones empresariales",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={`${poppins.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
