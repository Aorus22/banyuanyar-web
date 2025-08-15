import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHeader({ 
  title, 
  description, 
  backgroundImage = "https://desabanyuanyar.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-04-at-19.31.32-1-1-637x427.jpeg"
}: PageHeaderProps) {
  return (
    <div className="relative mb-8 overflow-hidden min-h-[50vh]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Overlay untuk memastikan teks tetap terbaca */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 p-16 md:p-24 lg:p-24 text-center text-white flex flex-col justify-end items-center min-h-[50vh] pb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
} 