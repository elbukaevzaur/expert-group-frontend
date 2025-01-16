"use client";

import "@/app/globals.css";
import LkDashboard from "@/components/dashboard/lk-dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="account">
          <LkDashboard/>
          {children}
      </div>
  );
}
