import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export default function LoadingPage() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='mb-2 h-9 w-32' />
          <Skeleton className='h-5 w-64' />
        </div>
        <Skeleton className='h-10 w-40' />
      </div>

      {/* Stats Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className='bg-card text-card-foreground rounded-xl border shadow'
          >
            <div className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-4' />
            </div>
            <div className='p-6 pt-0'>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-32' />
            </div>
          </Card>
        ))}
      </div>

      {/* Filter Skeleton */}
      <div className='flex items-center space-x-2'>
        <Skeleton className='h-9 w-20' />
      </div>

      {/* Gallery Grid Skeleton */}
      <div className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className='overflow-hidden'>
              <div className='aspect-video bg-gray-100'>
                <Skeleton className='h-full w-full' />
              </div>
              <CardContent className='space-y-3 p-4'>
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-4 w-3/4' />
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-6 w-16' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='flex justify-center'>
          <Skeleton className='h-4 w-48' />
        </div>
      </div>
    </div>
  );
}
