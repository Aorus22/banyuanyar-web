import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, Home } from 'lucide-react';

export default function NewsNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">News Tidak Ditemukan</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            Maaf, news yang Anda cari tidak dapat ditemukan atau mungkin telah dihapus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/admin/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Daftar News
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin">
                <Home className="mr-2 h-4 w-4" />
                Dashboard Admin
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 