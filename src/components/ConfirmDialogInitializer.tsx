'use client';

import * as React from 'react';
import { useConfirmDialog, setGlobalConfirmDialog } from '@/components/ui';

export function ConfirmDialogInitializer() {
  const showConfirm = useConfirmDialog();

  React.useEffect(() => {
    setGlobalConfirmDialog(showConfirm);
  }, [showConfirm]);

  return null;
}

// Export default untuk kemudahan import
export default ConfirmDialogInitializer;
