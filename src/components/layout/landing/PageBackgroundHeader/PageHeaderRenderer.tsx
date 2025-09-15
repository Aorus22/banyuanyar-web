'use client';

import React from 'react';
import { usePageHeader } from './PageHeaderContext';
import { PageHeader } from './PageHeader';

export function PageHeaderRenderer() {
  const { headerData } = usePageHeader();

  if (!headerData) {
    return null;
  }

  return (
    <PageHeader
      title={headerData.title}
      description={headerData.description}
      backgroundImage={headerData.backgroundImage}
    />
  );
}
