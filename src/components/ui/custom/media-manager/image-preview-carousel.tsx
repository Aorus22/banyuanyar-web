'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePreviewCarouselProps {
  images: string[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showThumbnails?: boolean;
  showProgressBar?: boolean;
  thumbnailSize?: 'sm' | 'md' | 'lg';
  showSmallImages?: boolean;
}

export function ImagePreviewCarousel({
  images,
  className,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showThumbnails = true,
  showProgressBar = false,
  thumbnailSize = 'md',
  showSmallImages = true
}: ImagePreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isTransitioning]);

  const prevImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, isTransitioning]);

  const goToImage = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    },
    [currentIndex, isTransitioning]
  );

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Handle transition end
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || !autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      nextImage();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlay, interval, nextImage, images.length]);

  // Reset play state when images change
  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay, images]);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'flex h-64 items-center justify-center rounded-lg bg-gray-100',
          className
        )}
      >
        <p className='text-gray-500'>No images available</p>
      </div>
    );
  }

  const thumbnailSizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image Container */}
      <div className='group relative'>
        <div className='relative overflow-hidden rounded-lg bg-gray-100'>
          <div className='relative h-96 w-full'>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={cn(
                  'absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out',
                  index === currentIndex
                    ? 'translate-x-0 scale-100 opacity-100'
                    : index ===
                          (currentIndex - 1 + images.length) % images.length &&
                        direction === 'prev'
                      ? '-translate-x-full scale-95 opacity-0'
                      : index === (currentIndex + 1) % images.length &&
                          direction === 'next'
                        ? 'translate-x-full scale-95 opacity-0'
                        : 'translate-x-0 scale-95 opacity-0'
                )}
                onTransitionEnd={handleTransitionEnd}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0NyA4OC4wMDAxIDgxIDk4IDgxSDEwMkMxMTEuOTU2IDgxIDEyMCA4OS41NDQ3IDEyMCAxMDBDMTIwIDExMC40NTUgMTExLjk1NiAxMTkgMTAyIDExOUg5OEM4OC4wMDAxIDExOSA4MCAxMTAuNDU1IDgwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAxMzBDMTEwLjQ1NSAxMzAgMTE5IDEyMS40NTUgMTE5IDExMUg4MUM4MSAxMjEuNDU1IDg5LjU0NDcgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showControls && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              disabled={isTransitioning}
              className={cn(
                'absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70',
                isTransitioning && 'pointer-events-none opacity-50'
              )}
              aria-label='Previous image'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <button
              onClick={nextImage}
              disabled={isTransitioning}
              className={cn(
                'absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70',
                isTransitioning && 'pointer-events-none opacity-50'
              )}
              aria-label='Next image'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </>
        )}

        {/* Play/Pause Button */}
        {showControls && autoPlay && images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className='absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/70'
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className='h-4 w-4' />
            ) : (
              <Play className='h-4 w-4' />
            )}
          </button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className='absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white'>
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && showSmallImages && images.length > 1 && (
        <div className='flex gap-2 overflow-x-auto pb-2'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className={cn(
                'flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 hover:opacity-80',
                thumbnailSizeClasses[thumbnailSize],
                currentIndex === index
                  ? 'scale-105 border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300',
                isTransitioning && 'pointer-events-none opacity-60'
              )}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className='h-full w-full object-contain'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0NyA4OC4wMDAxIDgxIDk4IDgxSDEwMkMxMTEuOTU2IDgxIDEyMCA4OS41NDQ3IDEyMCAxMDBDMTIwIDExMC40NTUgMTExLjk1NiAxMTkgMTAyIDExOUg5OEM4OC4wMDAxIDExOSA4MCAxMTAuNDU1IDgwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAxMzBDMTEwLjQ1NSAxMzAgMTE5IDEyMS40NTUgMTE5IDExMUg4MUM4MSAxMjEuNDU1IDg5LjU0NDcgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {showProgressBar && showControls && autoPlay && images.length > 1 && (
        <div className='h-1 w-full rounded-full bg-gray-200'>
          <div
            className='h-1 rounded-full bg-blue-500 transition-all duration-100 ease-linear'
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
}
