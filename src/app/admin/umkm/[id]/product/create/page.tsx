import { UmkmProductForm } from '../../umkm-product-form';
import { createUmkmProduct } from '../[productId]/edit/server-action';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface CreateUmkmProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreateUmkmProductPage({ params }: CreateUmkmProductPageProps) {
  const { id: umkmId } = await params;
  
  return (
    <div className="space-y-6">
      <Heading
        title="Tambah Produk UMKM"
        description="Buat produk baru untuk UMKM ini"
      />
      <Separator />
      
      <UmkmProductForm 
        umkmId={parseInt(umkmId)}
        createProduct={createUmkmProduct} 
      />
    </div>
  );
} 