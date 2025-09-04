import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google"; // ✅ uniquement des Google Fonts
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ivoir Mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${pacifico.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
