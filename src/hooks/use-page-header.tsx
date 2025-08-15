'use client';

import { useEffect } from 'react';
import { usePageHeader } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderContext';

interface UsePageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function usePageHeaderEffect({ title, description, backgroundImage }: UsePageHeaderProps) {
  const { setHeaderData } = usePageHeader();

  useEffect(() => {
    setHeaderData({ title, description, backgroundImage });

    // Cleanup ketika komponen unmount
    return () => {
      setHeaderData(null);
    };
  }, [title, description, backgroundImage, setHeaderData]);
} 