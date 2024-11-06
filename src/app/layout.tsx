import type { Metadata } from "next";
import "./globals.css";
import Header from "components/layout/Header";

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
      <body className="antialiased bg-[#12131A] text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
