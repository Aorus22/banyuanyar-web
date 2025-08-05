import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'KKN Coordinator',
    university: 'Universitas Sebelas Maret',
    content: 'This platform has revolutionized how we manage our KKN programs. The analytics and reporting features help us track student progress effectively.',
    avatar: '/avatars/sarah.jpg',
    rating: 5
  },
  {
    name: 'Ahmad Rizki',
    role: 'KKN Student',
    university: 'UNS Engineering',
    content: 'The collaboration tools are amazing! I can easily communicate with my team and the community members. It makes our KKN project much more organized.',
    avatar: '/avatars/ahmad.jpg',
    rating: 5
  },
  {
    name: 'Maria Garcia',
    role: 'Community Leader',
    university: 'Banyuanyar Village',
    content: 'The platform has made it so much easier for our community to engage with KKN students. The feedback forms and communication tools are very user-friendly.',
    avatar: '/avatars/maria.jpg',
    rating: 5
  },
  {
    name: 'Prof. David Chen',
    role: 'Academic Supervisor',
    university: 'UNS Faculty of Social Sciences',
    content: 'As a supervisor, I can easily monitor multiple KKN projects simultaneously. The dashboard provides excellent insights into student progress and community impact.',
    avatar: '/avatars/david.jpg',
    rating: 5
  },
  {
    name: 'Nina Putri',
    role: 'KKN Student',
    university: 'UNS Medical School',
    content: 'The mobile-friendly interface is perfect for fieldwork. I can update our project progress and communicate with my team even when I\'m in remote areas.',
    avatar: '/avatars/nina.jpg',
    rating: 5
  },
  {
    name: 'Pak Suryo',
    role: 'Village Head',
    university: 'Banyuanyar Community',
    content: 'The platform has strengthened the partnership between our village and the university. We can now track the impact of KKN projects more effectively.',
    avatar: '/avatars/suryo.jpg',
    rating: 5
  }
];

export function LandingTestimonials() {
  return (
    <div id='testimonials' className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight'>
            What Our Users Say
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Hear from KKN coordinators, students, and community members about their experience with our platform.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='h-full'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold text-sm'>{testimonial.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {testimonial.role} • {testimonial.university}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 