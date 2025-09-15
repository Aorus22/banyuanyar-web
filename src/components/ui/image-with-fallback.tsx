'use client';

import * as React from 'react';
import NextImage, { type ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ImageWithFallbackProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null;
  alt: string;
  containerClassName?: string;
  fallbackClassName?: string;
};

export function ImageWithFallback({
  src,
  alt,
  className,
  containerClassName,
  fallbackClassName,
  onError,
  ...imgProps
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = React.useState(!src || src.trim() === '');

  const showFallback = hasError;

  if (showFallback) {
    // When using fill, ensure the parent provides relative positioning (e.g., AspectRatio)
    return (
      <div
        className={cn(
          'bg-muted text-muted-foreground flex items-center justify-center',
          imgProps.fill ? 'absolute inset-0' : 'h-full w-full',
          containerClassName,
          fallbackClassName
        )}
        aria-label={alt}
        role='img'
      >
        <ImageOff className='h-8 w-8 opacity-70' />
      </div>
    );
  }

  return (
    <NextImage
      {...imgProps}
      src={src as string}
      alt={alt}
      className={className}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
    />
  );
}

export default ImageWithFallback;
