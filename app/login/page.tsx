'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginDialog } from '@/components/auth/login-dialog';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { DevelopmentNotice } from '@/components/development-notice';

const features = [
  {
    title: 'Professional Experience',
    description:
      'Discover my journey through various roles and responsibilities',
  },
  {
    title: 'Skills & Expertise',
    description: 'Explore my technical skills and professional competencies',
  },
  {
    title: 'Projects & Achievements',
    description: 'View my portfolio of successful projects and accomplishments',
  },
];

function LoginContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
      router.push(callbackUrl);
    }
  }, [status, router, searchParams]);

  const handleSubmit = async (username: string, password: string) => {
    setIsLoading(true);

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error('Authentication failed', {
        description: 'Invalid credentials. Please try again.',
      });
    } else {
      toast.success('Login successful', {
        description: 'Redirecting to dashboard...',
      });
      setIsOpen(false);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <DevelopmentNotice />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center text-white">
        <HeroSection
          title="Welcome to My Professional Journey"
          description="Explore my skills, experiences, and achievements through this interactive resume platform. Login to access the full experience and discover more about my professional story."
          onLoginClick={() => setIsOpen(true)}
        />

        <LoginDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <FeatureGrid features={features} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
