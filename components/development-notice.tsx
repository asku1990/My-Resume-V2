'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function DevelopmentNotice() {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.message('🚧 Development Notice', {
        description:
          'This site is under development. Content and features are for demonstration purposes.',
        duration: 6000,
        className:
          'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-2 border-indigo-200',
        descriptionClassName: 'text-indigo-100',
      });
      hasShownToast.current = true;
    }
  }, []);

  return null;
}
