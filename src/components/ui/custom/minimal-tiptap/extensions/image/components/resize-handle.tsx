import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResizeProps extends React.ComponentProps<'div'> {
  isResizing?: boolean;
}

export const ResizeHandle = ({
  ref,
  className,
  isResizing = false,
  ...props
}: ResizeProps) => {
  return (
    <div
      className={cn(
        'absolute top-1/2 z-10 h-10 max-h-full w-2 -translate-y-1/2 transform cursor-col-resize rounded border border-solid border-gray-400 bg-white/80 p-px transition-all',
        'opacity-0',
        {
          'opacity-100': isResizing,
          'group-hover/node-image:opacity-100': !isResizing
        },
        'before:absolute before:inset-y-0 before:-right-1 before:-left-1',
        className
      )}
      ref={ref}
      {...props}
    ></div>
  );
};

ResizeHandle.displayName = 'ResizeHandle';
