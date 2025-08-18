import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Calendar, MapPin, Clock, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { PageHeaderEffect } from '@/components/layout/landing/PageBackgroundHeader/PageHeaderEffect';
import { ClientPagination } from '@/components/ui/custom';

interface AgendaKegiatanPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AgendaKegiatanPage({ searchParams }: AgendaKegiatanPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  // Get total count for pagination
  const totalEvents = await prisma.event.count();
  const totalPages = Math.ceil(totalEvents / itemsPerPage);

  const events = await prisma.event.findMany({
    orderBy: {
      date: 'desc' // Show newest events first
    },
    skip,
    take: itemsPerPage
  });

  // Get media for events in a separate query
  const eventIds = events.map(event => event.id);
  const eventMedia = await prisma.media.findMany({
    where: {
      entityType: 'event',
      entityId: { in: eventIds },
      mimeType: { startsWith: 'image/' }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Create a map of event ID to media
  const mediaMap = new Map();
  eventMedia.forEach(media => {
    if (!mediaMap.has(media.entityId)) {
      mediaMap.set(media.entityId, media);
    }
  });

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

  // Function to calculate status based on current date
  const getEventStatus = (date: Date, startTime: string | null, endTime: string | null) => {
    const now = new Date();
    const eventDate = new Date(date);
    
    // Set time to start time if available, otherwise 00:00
    if (startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      eventDate.setHours(hours, minutes, 0, 0);
    } else {
      eventDate.setHours(0, 0, 0, 0);
    }
    
    // Set end time if available
    let eventEndDate = new Date(date);
    if (endTime) {
      const [hours, minutes] = endTime.split(':').map(Number);
      eventEndDate.setHours(hours, minutes, 0, 0);
    } else {
      eventEndDate.setHours(23, 59, 59, 999);
    }
    
    if (now < eventDate) {
      return 'UPCOMING';
    } else if (now >= eventDate && now <= eventEndDate) {
      return 'ONGOING';
    } else {
      return 'COMPLETED';
    }
  };

  return (
    <>
      <PageHeaderEffect 
        title="Agenda Kegiatan"
        description="Jadwal dan agenda kegiatan desa Banyuanyar"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const eventStatus = getEventStatus(event.date, event.startTime, event.endTime);
            const eventImage = mediaMap.get(event.id);
            
            return (
              <Card key={event.id} className="hover:shadow-lg transition-shadow pt-0 overflow-hidden">
                {/* Event Image */}
                <div className="aspect-video overflow-hidden">
                  {eventImage ? (
                    <ImageWithFallback
                      src={eventImage.fileUrl}
                      alt={event.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      fallbackClassName="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-blue-400" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {getStatusBadge(eventStatus)}
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(event.date), "dd MMM yyyy", { locale: idLocale })}
                      {event.startTime && ` pukul ${event.startTime}`}
                    </span>
                  </div>
                  
                  <CardTitle className="line-clamp-2 text-lg">
                    <Link 
                      href={`/informasi/agenda-kegiatan/${event.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {event.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(event.date), "dd MMM yyyy", { locale: idLocale })}
                        {event.startTime && ` pukul ${event.startTime}`}
                        {event.endTime && event.startTime !== event.endTime && ` - ${event.endTime}`}
                      </span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                    
                    {event.organizer && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.organizer}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/informasi/agenda-kegiatan/${event.id}`}>
                      Lihat Detail
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {events.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-2">
                Belum ada agenda kegiatan yang tersedia
              </p>
              <p className="text-sm text-muted-foreground">
                Agenda kegiatan akan ditampilkan di sini
              </p>
            </CardContent>
          </Card>
        )}

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/informasi/agenda-kegiatan"
        />
      </div>
    </>
  );
} 