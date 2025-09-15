import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function VillageProfilePage() {
  const profileSections = [
    {
      title: 'Sejarah',
      description: 'Kelola sejarah dan cerita rakyat desa',
      url: '/admin/village-profile/history',
      icon: 'page'
    },
    {
      title: 'Visi & Misi',
      description: 'Kelola visi dan misi pembangunan desa',
      url: '/admin/village-profile/vision-mission',
      icon: 'target'
    },
    {
      title: 'Tujuan & Sasaran',
      description: 'Kelola tujuan dan sasaran pembangunan desa',
      url: '/admin/village-profile/objectives',
      icon: 'flag'
    },
    {
      title: 'Demografi & Geografis',
      description: 'Kelola informasi demografi dan geografis desa',
      url: '/admin/village-profile/demographics',
      icon: 'map'
    }
  ];

  return (
    <div className='space-y-6'>
      <Heading
        title='Profil Desa'
        description='Kelola informasi profil dan identitas desa Banyuanyar'
      />
      <Separator />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
        {profileSections.map((section) => {
          const Icon = Icons[section.icon as keyof typeof Icons];
          return (
            <Link key={section.title} href={section.url}>
              <Card className='cursor-pointer transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-center space-x-3'>
                    {Icon && <Icon className='text-muted-foreground h-6 w-6' />}
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground text-sm'>
                    Klik untuk mengedit {section.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
