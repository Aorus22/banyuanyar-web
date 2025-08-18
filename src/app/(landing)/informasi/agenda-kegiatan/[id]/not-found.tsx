import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function EventNotFound() {
  return (
    <div className="container mx-auto px-4 py-8 mt-24 max-w-2xl">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Calendar className="w-16 h-16 text-muted-foreground opacity-50" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Event Tidak Ditemukan</h1>
          <p className="text-muted-foreground">
            Maaf, event yang Anda cari tidak dapat ditemukan atau telah dihapus.
          </p>
        </div>

        <Card className="p-6">
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Event mungkin telah selesai, dibatalkan, atau URL yang Anda masukkan salah.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/informasi/agenda-kegiatan">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Agenda
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/">
                  Beranda
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 