import { notFound } from 'next/navigation';
import { getUmkmById } from '../query';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, MapPin, Phone, Mail, User, Package, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import UmkmProductTable from './umkm-product-table';

interface UmkmDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  const { id: umkmId } = await params;
  const umkm = await getUmkmById(parseInt(umkmId));

  if (!umkm) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header dengan tombol Edit */}
      <div className='flex items-start justify-between'>
        <Heading
          title={umkm.name}
          description='Detail informasi UMKM dan produk'
        />
        <Button asChild className="flex items-center gap-2">
          <Link href={`/admin/umkm/${umkmId}/edit`}>
            <Edit className="h-4 w-4" /> Edit UMKM
          </Link>
        </Button>
      </div>
      <Separator />

      {/* Informasi UMKM */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Informasi UMKM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Pemilik:</span>
                <span>{umkm.ownerName || 'Tidak diketahui'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Jenis Produk:</span>
                {umkm.productType ? (
                  <Badge variant="outline">{umkm.productType}</Badge>
                ) : (
                  <span className="text-muted-foreground">Tidak diketahui</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Bergabung:</span>
                <span>{format(new Date(umkm.createdAt), "dd MMMM yyyy", { locale: id })}</span>
              </div>
            </div>

            <div className="space-y-3">
              {umkm.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">Alamat:</span>
                    <p className="text-sm text-muted-foreground">{umkm.address}</p>
                  </div>
                </div>
              )}

              {umkm.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Telepon:</span>
                  <span>{umkm.phone}</span>
                </div>
              )}

              {umkm.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span>{umkm.email}</span>
                </div>
              )}
            </div>
          </div>

          {umkm.description && (
            <div className="pt-4 border-t">
              <span className="font-medium">Deskripsi:</span>
              <p className="text-sm text-muted-foreground mt-1">{umkm.description}</p>
            </div>
          )}

          {umkm.latitude && umkm.longitude && (
            <div className="pt-4 border-t">
              <span className="font-medium">Koordinat:</span>
              <p className="text-sm text-muted-foreground mt-1">
                {umkm.latitude}, {umkm.longitude}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabel Produk UMKM */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Produk UMKM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UmkmProductTable umkmId={umkm.id} products={umkm.products} showCreateButton={true} />
        </CardContent>
      </Card>
    </div>
  );
} 