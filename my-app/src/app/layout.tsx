


"use client";

import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth"; // Your authentication hook
import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
// import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to the portal, but allow them to access /auth/login
  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === "/") {
      router.push("/portal");
    }
  }, [isAuthenticated, isLoading, pathname, router]);
  
  // useEffect(() => {
  //   if (!isLoading && isAuthenticated && pathname === "/") {
  //     router.push("/portal");
  //   }
  // }, [isAuthenticated, isLoading, pathname, router]);
  
  

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Chamaa Connect</h1>
            <nav>
              {isAuthenticated ? (
                <Link href="/portal">
                  <Button variant="ghost">Portal</Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              )}
            </nav>
          </div>
        </header>
  
        <main className="container mx-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <p>Loading...</p>
            </div>
          ) : (
            children
          )}
        </main>
  
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} Chamaa Connect. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}