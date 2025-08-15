import { notFound } from 'next/navigation';
import { getUmkmProductById } from './query';
import { updateUmkmProduct } from './server-action';
import { UmkmProductForm } from '../../../umkm-product-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface EditUmkmProductPageProps {
  params: {
    id: string;
    productId: string;
  };
}

export default async function EditUmkmProductPage({ params }: EditUmkmProductPageProps) {
  const { id: umkmId, productId } = await params;
  const product = await getUmkmProductById(parseInt(productId));

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Heading
        title="Edit Produk UMKM"
        description={`Edit data produk: ${product.name}`}
      />
      <Separator />
      
      <UmkmProductForm 
        product={product} 
        umkmId={parseInt(umkmId)}
        updateProduct={updateUmkmProduct} 
      />
    </div>
  );
} 