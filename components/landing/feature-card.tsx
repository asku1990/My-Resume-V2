'use client';

import { motion } from 'framer-motion';
import type { FeatureCardProps } from '@/types/features';

export function FeatureCard({
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-white/10 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </motion.div>
  );
}
