import '@/styles/global.css';
import { inter } from '@/components/fonts';
import { NextAuthProvider } from "@/providers/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
