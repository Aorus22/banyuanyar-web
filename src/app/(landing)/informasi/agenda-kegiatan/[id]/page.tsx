import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { ImagePreviewCarousel } from '@/components/ui/custom';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Calendar, MapPin, Clock, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const eventId = parseInt(id);

  if (isNaN(eventId)) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) {
    notFound();
  }

  // Get media for this event
  const eventMedia = await prisma.media.findMany({
    where: {
      entityType: 'event',
      entityId: eventId,
      mimeType: { startsWith: 'image/' }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Function to calculate status based on current date
  const getEventStatus = (startDate: Date, endDate: Date | null) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;
    
    if (now < start) {
      return 'UPCOMING';
    } else if (now >= start && now <= end) {
      return 'ONGOING';
    } else {
      return 'COMPLETED';
    }
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">Mendatang</Badge>;
      case 'ONGOING':
        return <Badge variant="outline" className="border-green-500 text-green-600">Sedang Berlangsung</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="border-gray-500 text-gray-600">Selesai</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const eventStatus = getEventStatus(event.startDate, event.endDate);

  return (
    <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/informasi/agenda-kegiatan">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Agenda
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          {getStatusBadge(eventStatus)}
          <span className="text-sm text-muted-foreground">
            {format(new Date(event.startDate), "dd MMMM yyyy", { locale: idLocale })}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 leading-tight">{event.title}</h1>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(event.startDate), "dd MMMM yyyy", { locale: idLocale })}
              {event.endDate && event.endDate !== event.startDate && (
                <> - {format(new Date(event.endDate), "dd MMMM yyyy", { locale: idLocale })}</>
              )}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
          
          {event.organizer && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.organizer}</span>
            </div>
          )}
        </div>

        {/* Event Media Gallery */}
        {eventMedia.length > 0 ? (
          <div className="mb-6">            
            {eventMedia.length === 1 ? (
              // Single image - no carousel needed
              <div className="mb-4">
                <ImageWithFallback
                  src={eventMedia[0].fileUrl}
                  alt={eventMedia[0].fileName}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                  fallbackClassName="w-full h-64 rounded-lg"
                />
              </div>
            ) : (
              // Multiple images - use carousel
              <ImagePreviewCarousel 
                images={eventMedia.map(media => media.fileUrl)}
                autoPlay={true}
                interval={5000}
                thumbnailSize="md"
              />
            )}
          </div>
        ) : (
          // No media available
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Belum ada media tersedia
              </span>
            </div>
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-blue-400" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {event.description && (
        <div className="max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Deskripsi Kegiatan</h2>
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        </div>
      )}

      {/* Event Details Card */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Detail Kegiatan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div>{getStatusBadge(eventStatus)}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Tanggal Mulai</label>
                <p className="text-sm">
                  {format(new Date(event.startDate), "dd MMMM yyyy", { locale: idLocale })}
                </p>
              </div>
              
              {event.endDate && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Tanggal Selesai</label>
                  <p className="text-sm">
                    {format(new Date(event.endDate), "dd MMMM yyyy", { locale: idLocale })}
                  </p>
                </div>
              )}
              
              {event.location && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Lokasi</label>
                  <p className="text-sm">{event.location}</p>
                </div>
              )}
              
              {event.organizer && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Penyelenggara</label>
                  <p className="text-sm">{event.organizer}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 