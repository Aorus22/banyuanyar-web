'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageHeaderData {
  title: string;
  description?: string;
  backgroundImage?: string;
}

interface PageHeaderContextType {
  headerData: PageHeaderData | null;
  setHeaderData: (data: PageHeaderData | null) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [headerData, setHeaderData] = useState<PageHeaderData | null>(null);

  return (
    <PageHeaderContext.Provider value={{ headerData, setHeaderData }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader() {
  const context = useContext(PageHeaderContext);
  if (context === undefined) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }
  return context;
} 