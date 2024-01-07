import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
