import type { Metadata } from "next";
import { Noto_Sans, Passion_One } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${passionOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
