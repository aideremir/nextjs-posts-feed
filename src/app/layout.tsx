import type { Metadata } from "next";
import Providers from "./providers";

import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Posts Feed App",
  description: "Only1: Fullstack Developer Assignment",
};

export default function RootLayout({
  modal,
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200">
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
