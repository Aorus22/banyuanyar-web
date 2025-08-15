'use client';

import { useEffect } from 'react';
import { usePageHeader } from './PageHeaderContext';

interface PageHeaderEffectProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHeaderEffect({ title, description, backgroundImage }: PageHeaderEffectProps) {
  const { setHeaderData } = usePageHeader();

  useEffect(() => {
    setHeaderData({ title, description, backgroundImage });

    // Cleanup ketika komponen unmount
    return () => {
      setHeaderData(null);
    };
  }, [title, description, backgroundImage, setHeaderData]);

  // Komponen ini tidak me-render apapun, hanya effect
  return null;
} 