"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();
  const userType = path.split("/")[2];
  return (
    <div className="flex flex-row min-h-screen gap-0">
      <div className="flex flex-row p-2">
        <Sidebar userType={userType} />
      </div>
      <div className="w-full max-w-7xl m-auto">{children}</div>
    </div>
  );
}
