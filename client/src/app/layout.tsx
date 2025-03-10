import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBarProvider>
          <Header />
          <main className="min-h-screen container my-4 py-4 bg-slate-400/10 rounded-lg">
            {children}
          </main>
          <Footer />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
