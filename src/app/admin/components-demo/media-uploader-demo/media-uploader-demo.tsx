'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  UniversalImageUploader, 
  MediaGallery, 
  MediaManager
} from '@/components/ui/custom';
import { UploadResult } from '@/app/admin/media/universal-upload-action';
import { Upload, Image as ImageIcon, Images, Settings } from 'lucide-react';

export default function MediaUploaderDemo() {
  const [uploadedMediaIds, setUploadedMediaIds] = useState<number[]>([]);
  const [demoMedia, setDemoMedia] = useState<Array<{
    id: number;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    description?: string;
    createdAt: Date;
  }>>([]);

  const handleUploadSuccess = (mediaIds: number[]) => {
    setUploadedMediaIds(prev => [...prev, ...mediaIds]);
    
    // Simulate adding demo media
    mediaIds.forEach((id, index) => {
      setDemoMedia(prev => [...prev, {
        id,
        fileName: `demo-image-${id}.jpg`,
        fileUrl: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&id=${id}`,
        fileSize: 1024 * 1024 * (Math.random() * 2 + 1), // Random size 1-3MB
        mimeType: 'image/jpeg',
        description: `Demo image ${id} - uploaded at ${new Date().toLocaleTimeString()}`,
        createdAt: new Date()
      }]);
    });
  };

  const handleMediaDeleted = (mediaId: number) => {
    setDemoMedia(prev => prev.filter(item => item.id !== mediaId));
    setUploadedMediaIds(prev => prev.filter(id => id !== mediaId));
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Media Uploader Demo</h1>
        <p className="text-muted-foreground text-lg">
          Komponen universal untuk upload dan kelola media ke Cloudinary
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Universal Image Uploader Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Universal Image Uploader
            </CardTitle>
            <CardDescription>
              Komponen upload gambar universal dengan drag & drop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UniversalImageUploader
              entityType="demo"
              entityId={123}
              onUploadSuccess={handleUploadSuccess}
              maxFiles={3}
            >
              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Gambar Demo
              </Button>
            </UniversalImageUploader>
            
            <div className="text-sm text-muted-foreground">
              <p>Entity Type: demo</p>
              <p>Entity ID: 123</p>
              <p>Max Files: 3</p>
              <p>Uploaded IDs: {uploadedMediaIds.join(', ') || 'None'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Media Gallery Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Images className="h-5 w-5" />
              Media Gallery
            </CardTitle>
            <CardDescription>
              Tampilan gallery untuk media yang sudah diupload
            </CardDescription>
          </CardHeader>
          <CardContent>
            {demoMedia.length > 0 ? (
              <MediaGallery
                media={demoMedia}
                entityType="demo"
                entityId={123}
                onMediaDeleted={handleMediaDeleted}
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada media</p>
                <p className="text-sm">Upload gambar terlebih dahulu</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Media Manager Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Media Manager (Complete Solution)
          </CardTitle>
          <CardDescription>
            Komponen lengkap yang menggabungkan uploader dan gallery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaManager
            entityType="demo"
            entityId={456}
            title="Demo Media Manager"
            description="Contoh penggunaan komponen lengkap media manager"
            maxFiles={5}
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Usage Examples */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Cara Penggunaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">🚀 Upload Gambar</h3>
            <p>Drag & drop atau pilih file gambar</p>
            <p>Mendukung JPG, PNG, WebP, GIF</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">💾 Simpan ke Database</h3>
            <p>Gambar diupload ke Cloudinary</p>
            <p>Metadata disimpan di tabel Media</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">🎯 Entity Specific</h3>
            <p>Setiap upload terkait entity tertentu</p>
            <p>Mudah dikelola per kategori</p>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Contoh Kode</CardTitle>
          <CardDescription>
            Cara menggunakan komponen media uploader
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. Uploader Sederhana</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<UniversalImageUploader
  entityType="news"
  entityId={123}
  onUploadSuccess={handleSuccess}
>
  <Button>Upload Gambar</Button>
</UniversalImageUploader>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">2. Media Manager Lengkap</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<MediaManager
  entityType="news"
  entityId={123}
  title="Media News"
  maxFiles={10}
  showDescription={true}
/>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">3. Gallery Terpisah</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<MediaGallery
  media={mediaList}
  entityType="news"
  entityId={123}
  onMediaDeleted={handleDelete}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 