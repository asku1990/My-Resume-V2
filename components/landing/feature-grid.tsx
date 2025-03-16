'use client';

import { FeatureCard } from './feature-card';
import type { FeatureGridProps } from '@/types/features';

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          delay={0.2 * (index + 1)}
        />
      ))}
    </div>
  );
}
