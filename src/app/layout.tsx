"use client";

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
      <head>
        <title>Expert Group</title>
      </head>
      <body>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <StoreProvider>
          <Dashboard />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
