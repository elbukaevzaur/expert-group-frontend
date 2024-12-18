"use client";

import "@/app/globals.css";
import LkDashboard from "@/components/lk-dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div style={{flexDirection: 'row', display: 'flex'}}>
          <LkDashboard/>
          {children}
      </div>
  );
}
