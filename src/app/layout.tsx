import type { Metadata } from "next";
import "./globals.css";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

export const metadata: Metadata = {
  title: "QuickSwap Launchpad",
  description: "The landing page for the QuickSwap launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
