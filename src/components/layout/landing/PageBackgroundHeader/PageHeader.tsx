import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHeader({
  title,
  description,
  backgroundImage = 'https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.32-1-1-637x427.jpeg'
}: PageHeaderProps) {
  return (
    <div className='relative mb-8 min-h-[50vh] overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />

      {/* Overlay untuk memastikan teks tetap terbaca */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Content */}
      <div className='relative z-10 flex min-h-[50vh] flex-col items-center justify-end p-16 pb-8 text-center text-white md:p-24 lg:p-24'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
          {title}
        </h1>
        {description && (
          <p className='mx-auto max-w-3xl text-lg opacity-90 md:text-xl'>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
