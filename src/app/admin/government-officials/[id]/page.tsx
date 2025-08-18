import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getGovernmentOfficialById } from '../query';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { GovernmentOfficial } from '../columns';

interface GovernmentOfficialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GovernmentOfficialPage({ params }: GovernmentOfficialPageProps) {
  const { id } = await params;
  const official = await getGovernmentOfficialById(parseInt(id));

  if (!official) {
    notFound();
  }

  const socialMedia = official.socialMedia as any || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Detail Perangkat Desa"
          description={`Informasi lengkap ${official.name}`}
        />
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/government-officials">
              <Icons.arrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/government-officials/${official.id}/edit`}>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo and Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {official.photoUrl ? (
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={official.photoUrl}
                    alt={official.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                  {official.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{official.name}</h3>
              <p className="text-muted-foreground">{official.position}</p>
              <Badge variant={official.isActive ? "default" : "secondary"}>
                {official.isActive ? "Aktif" : "Tidak Aktif"}
              </Badge>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Urutan: {official.sortOrder}</p>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Lengkap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {official.bio && (
              <div>
                <h4 className="font-medium mb-2">Biografi</h4>
                <p className="text-muted-foreground leading-relaxed">{official.bio}</p>
              </div>
            )}

            {/* Social Media */}
            {(socialMedia.facebook || socialMedia.instagram || socialMedia.twitter || socialMedia.whatsapp) && (
              <div>
                <h4 className="font-medium mb-3">Media Sosial</h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialMedia.facebook && (
                    <div className="flex items-center gap-2">
                      <Icons.facebook className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{socialMedia.facebook}</span>
                    </div>
                  )}
                  {socialMedia.instagram && (
                    <div className="flex items-center gap-2">
                      <Icons.instagram className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">{socialMedia.instagram}</span>
                    </div>
                  )}
                  {socialMedia.twitter && (
                    <div className="flex items-center gap-2">
                      <Icons.twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{socialMedia.twitter}</span>
                    </div>
                  )}
                  {socialMedia.whatsapp && (
                    <div className="flex items-center gap-2">
                      <Icons.messageCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{socialMedia.whatsapp}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Dibuat:</span>
                  <p>{new Date(official.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <span className="font-medium">Diperbarui:</span>
                  <p>{new Date(official.updatedAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 