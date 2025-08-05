import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is KKN and how does this platform help?',
    answer: 'KKN (Kuliah Kerja Nyata) is a community service program for university students. Our platform helps manage KKN projects, track progress, and facilitate communication between students, supervisors, and community members.'
  },
  {
    question: 'How many team members can I have on the free plan?',
    answer: 'The free plan allows up to 10 team members, which is perfect for small KKN groups. You can upgrade to Pro for up to 50 members or Enterprise for unlimited members.'
  },
  {
    question: 'Can I customize the platform for my university?',
    answer: 'Yes! The Pro and Enterprise plans include custom branding options. Enterprise users can also get a white-label solution with custom development to match their university\'s specific requirements.'
  },
  {
    question: 'What kind of analytics and reporting are available?',
    answer: 'We provide comprehensive analytics including project progress tracking, community engagement metrics, activity reports, and customizable dashboards. Advanced reporting features are available on Pro and Enterprise plans.'
  },
  {
    question: 'Is there support for mobile devices?',
    answer: 'Absolutely! Our platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Community members can easily access and interact with your KKN projects from any device.'
  },
  {
    question: 'How secure is the platform?',
    answer: 'We take security seriously. All data is encrypted in transit and at rest. We follow industry best practices for data protection and offer additional security features for Enterprise users including custom SLAs.'
  }
];

export function LandingFAQ() {
  return (
    <div id='faq' className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight'>
            Frequently Asked Questions
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to know about our KKN project management platform.
          </p>
        </div>

        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-left'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
} 