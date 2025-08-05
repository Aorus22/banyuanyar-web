import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for small KKN groups',
    price: 'Free',
    features: [
      'Up to 10 team members',
      'Basic project templates',
      'Community feedback forms',
      'Basic analytics',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Pro',
    description: 'Ideal for larger KKN projects',
    price: '$29',
    period: '/month',
    features: [
      'Up to 50 team members',
      'Advanced project templates',
      'Custom branding',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For university-wide KKN programs',
    price: 'Custom',
    features: [
      'Unlimited team members',
      'Custom project templates',
      'White-label solution',
      'Advanced reporting',
      'Dedicated support',
      'Custom development',
      'SLA guarantee'
    ],
    popular: false
  }
];

export function LandingPricing() {
  return (
    <div id='pricing' className='w-full py-12 xs:py-20 px-6'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight'>
            Simple, Transparent Pricing
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Choose the perfect plan for your KKN project needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary'>
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className='text-xl'>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className='mt-4'>
                  <span className='text-3xl font-bold'>{plan.price}</span>
                  {plan.period && (
                    <span className='text-muted-foreground'>{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 mb-6'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-center'>
                      <Check className='h-4 w-4 text-primary mr-2' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className='w-full'
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 