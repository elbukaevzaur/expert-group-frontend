"use client"

import "./globals.css";
import Dashboard from "@/components/dashboard";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Dashboard />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
