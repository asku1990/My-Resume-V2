'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { HeroSectionProps } from '@/types/features';

export function HeroSection({
  title,
  description,
  onLoginClick,
}: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-8 max-w-3xl"
    >
      <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
      <p className="text-xl text-blue-100 leading-relaxed">{description}</p>

      <Button
        size="lg"
        className="mt-8 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        onClick={onLoginClick}
      >
        Sign In to Continue
      </Button>
    </motion.div>
  );
}
