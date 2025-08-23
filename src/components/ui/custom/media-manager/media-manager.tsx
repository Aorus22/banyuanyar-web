'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { UniversalImageUploader } from './universal-image-uploader';
import { MediaGallery } from './media-gallery';
import { getMediaByEntity } from '@/app/admin/media/universal-upload-action';

interface MediaManagerProps {
  entityType: string;
  entityId?: number;
  title?: string;
  description?: string;
  className?: string;
  showUploadButton?: boolean;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export function MediaManager({
  entityType,
  entityId,
  title = 'Media Manager',
  description = 'Kelola media untuk entitas ini',
  className,
  showUploadButton = true,
  maxFiles = 999, // Allow unlimited files
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize = 10,
}: MediaManagerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMedia = async () => {
    if (!entityId) return;
    
    try {
      setIsLoading(true);
      const mediaData = await getMediaByEntity(entityType, entityId);
      setMedia(mediaData);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [entityType, entityId]);

  const handleUploadSuccess = (mediaIds: number[]) => {
    // Refresh media list after successful upload
    fetchMedia();
  };

  const handleMediaDeleted = (mediaId: number) => {
    setMedia(prev => prev.filter(item => item.id !== mediaId));
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          </div>
          
          {showUploadButton && (
            <UniversalImageUploader
              entityType={entityType}
              entityId={entityId}
              onUploadSuccess={handleUploadSuccess}
              maxFiles={maxFiles}
              acceptedFileTypes={acceptedFileTypes}
              maxFileSize={maxFileSize}
            >
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </UniversalImageUploader>
          )}
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Memuat media...</p>
          </div>
        ) : (
          <MediaGallery
            media={media}
            entityType={entityType}
            entityId={entityId}
            onMediaDeleted={handleMediaDeleted}
          />
        )}
      </CardContent>
    </Card>
  );
} 