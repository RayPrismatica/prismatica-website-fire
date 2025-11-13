import type { Metadata, Viewport } from "next";
import { Noto_Sans, Passion_One } from "next/font/google";
import "./globals.css";
import GlobalCarmenChat from "@/components/GlobalCarmenChat";
import { CarmenChatProvider } from "@/contexts/CarmenChatContext";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const passionOne = Passion_One({
  variable: "--font-passion",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Prismatica Labs - Intelligence Lives in Questions",
  description: "Strategic thinking for problems that matter. Work with us for high-stakes challenges. Use our products for daily team intelligence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/carmen-advisor.jpg" as="image" />
      </head>
      <body
        className={`${notoSans.variable} ${passionOne.variable} antialiased`}
      >
        <CarmenChatProvider>
          {children}
          <GlobalCarmenChat />
        </CarmenChatProvider>
      </body>
    </html>
  );
}
