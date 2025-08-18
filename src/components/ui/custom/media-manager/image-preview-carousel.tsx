"use client";

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

  const goToImage = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  }, [currentIndex, isTransitioning]);

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
      <div className={cn("flex items-center justify-center h-64 bg-gray-100 rounded-lg", className)}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const thumbnailSizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20", 
    lg: "w-24 h-24"
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image Container */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <div className="relative w-full h-96">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={cn(
                  "absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out",
                  index === currentIndex 
                    ? "opacity-100 scale-100 translate-x-0" 
                    : index === (currentIndex - 1 + images.length) % images.length && direction === 'prev'
                    ? "opacity-0 scale-95 -translate-x-full"
                    : index === (currentIndex + 1) % images.length && direction === 'next'
                    ? "opacity-0 scale-95 translate-x-full"
                    : "opacity-0 scale-95 translate-x-0"
                )}
                onTransitionEnd={handleTransitionEnd}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0NyA4OC4wMDAxIDgxIDk4IDgxSDEwMkMxMTEuOTU2IDgxIDEyMCA4OS41NDQ3IDEyMCAxMDBDMTIwIDExMC40NTUgMTExLjk1NiAxMTkgMTAyIDExOUg5OEM4OC4wMDAxIDExOSA4MCAxMTAuNDU1IDgwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAxMzBDMTEwLjQ1NSAxMzAgMTE5IDEyMS40NTUgMTE5IDExMUg4MUM4MSAxMjEuNDU1IDg5LjU0NDcgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
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
                "absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300",
                isTransitioning && "pointer-events-none opacity-50"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              disabled={isTransitioning}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300",
                isTransitioning && "pointer-events-none opacity-50"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Play/Pause Button */}
        {showControls && autoPlay && images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && showSmallImages && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className={cn(
                "flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:opacity-80",
                thumbnailSizeClasses[thumbnailSize],
                currentIndex === index 
                  ? "border-blue-500 ring-2 ring-blue-200 scale-105" 
                  : "border-gray-200 hover:border-gray-300",
                isTransitioning && "pointer-events-none opacity-60"
              )}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0NyA4OC4wMDAxIDgxIDk4IDgxSDEwMkMxMTEuOTU2IDgxIDEyMCA4OS41NDQ3IDEyMCAxMDBDMTIwIDExMC40NTUgMTExLjk1NiAxMTkgMTAyIDExOUg5OEM4OC4wMDAxIDExOSA4MCAxMTAuNDU1IDgwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAxMzBDMTEwLjQ1NSAxMzAgMTE5IDEyMS40NTUgMTE5IDExMUg4MUM4MSAxMjEuNDU1IDg5LjU0NDcgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {showProgressBar && showControls && autoPlay && images.length > 1 && (
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / images.length) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
} 