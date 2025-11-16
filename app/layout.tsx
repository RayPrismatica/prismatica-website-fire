import type { Metadata, Viewport } from "next";
import { Noto_Sans, Passion_One } from "next/font/google";
import "./globals.css";
import GlobalAthenaChat from "@/components/GlobalAthenaChat";
import { AthenaChatProvider } from "@/contexts/AthenaChatContext";
import MobileAnimations from "@/components/MobileAnimations";
import MobileBottomSheetAthena from "@/components/MobileBottomSheetAthena";

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
        <link rel="preload" href="/images/athena-advisor.jpg" as="image" />
      </head>
      <body
        className={`${notoSans.variable} ${passionOne.variable} antialiased`}
      >
        <AthenaChatProvider>
          {children}
          <GlobalAthenaChat />
          <MobileAnimations />
          <MobileBottomSheetAthena />
        </AthenaChatProvider>
      </body>
    </html>
  );
}
