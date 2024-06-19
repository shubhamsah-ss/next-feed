import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next-Feed",
  description: "Platform where your identify remains a secret",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
