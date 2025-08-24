import { DataTable } from '@/components/ui/custom/datatable/data-table';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDocuments } from './query';
import { CreateDocumentModal } from './create-document-modal';

export default async function DocumentPage() {
  const documents = await getDocuments();

  return (
    <div className="space-y-6">
      <div className='flex items-start justify-between'>
        <Heading
          title='Dokumen'
          description='Kelola semua dokumen desa'
        />
        <CreateDocumentModal />
      </div>
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen yang Tersedia</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <DataTable 
            columns={columns} 
            data={documents}
            hideToolbar={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
