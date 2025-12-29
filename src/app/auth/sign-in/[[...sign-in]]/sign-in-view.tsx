'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '../server-action';
import { MapPin, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignInViewPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(usernameOrEmail, password);

      if (result.success) {
        setIsLoading(false);
        setIsRedirecting(true);
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Login gagal');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Terjadi kesalahan');
      setIsLoading(false);
    }
  }

  return (
    <div className='relative min-h-screen flex'>
      {/* Left Panel - Background Image */}
      <div className='hidden lg:flex lg:w-1/2 relative'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url("https://google-drive-storage.banyuanyardrive.workers.dev/custom/1739420838_banyuanyar.jpg")`,
          }}
        />
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative z-10 flex flex-col justify-between p-12 text-white'>
          <div>
            <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
              <MapPin className='h-6 w-6' />
              <span>Desa Banyuanyar</span>
            </Link>
          </div>
          <div>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;Green Smart Village dengan berbagai potensi wisata alam,
                budaya lokal, dan UMKM yang berkembang.&rdquo;
              </p>
              <footer className='text-sm text-white/70'>
                Kecamatan Ampel, Kabupaten Boyolali
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className='flex-1 flex items-center justify-center p-6 lg:p-12 bg-background'>
        <div className='w-full max-w-md space-y-8'>
          {/* Mobile Logo */}
          <div className='lg:hidden text-center'>
            <Link href='/' className='inline-flex items-center gap-2 text-lg font-semibold text-foreground'>
              <MapPin className='h-6 w-6 text-primary' />
              <span>Desa Banyuanyar</span>
            </Link>
          </div>

          <Card className='border-border shadow-lg'>
            <CardHeader className='space-y-1 text-center pb-4'>
              <div className='mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                <LogIn className='h-6 w-6 text-primary' />
              </div>
              <CardTitle className='text-2xl font-bold tracking-tight'>
                Selamat Datang
              </CardTitle>
              <CardDescription>
                Masuk ke Dashboard Admin Desa Banyuanyar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username'>
                    Username atau Email
                  </Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder='Masukkan username atau email'
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                    className='h-11'
                    disabled={isLoading}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Masukkan password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='h-11'
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className='rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive'>
                    {error}
                  </div>
                )}

                <Button
                  type='submit'
                  className='w-full h-11 text-base'
                  disabled={isLoading || isRedirecting}
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Mengalihkan...
                    </>
                  ) : isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <LogIn className='mr-2 h-4 w-4' />
                      Masuk
                    </>
                  )}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <Link
                  href='/'
                  className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                  ← Kembali ke Beranda
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className='text-center text-sm text-muted-foreground'>
            Website Resmi Desa Banyuanyar
          </p>
        </div>
      </div>
    </div>
  );
}
