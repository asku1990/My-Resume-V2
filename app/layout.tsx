import React from 'react';
import '@/styles/global.css';
import { inter } from '@/styles/fonts';
import { NextAuthProvider } from '@/providers/auth';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <div className="min-h-screen bg-gray-50">{children}</div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
