export interface FeatureCardProps {
  title: string;
  description: string;
  delay?: number;
}

export interface FeatureGridProps {
  features: FeatureCardProps[];
}

export interface HeroSectionProps {
  title: string;
  description: string;
  onLoginClick: () => void;
}
