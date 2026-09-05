import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Auth from "../Providers/AuthProvider/Auth.js";
import QueryProvider from "../Providers/QueryProvider/Query.js";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-slate-50">
        <QueryProvider>
          <Auth>{children}</Auth>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
