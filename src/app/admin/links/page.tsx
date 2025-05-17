
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function AdminLinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Manage Links</h1>
        <Button asChild>
          <Link href="/admin/links/new"> {/* Placeholder link */}
            <Plus className="mr-2 h-4 w-4" /> Add New Link
          </Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Existing Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is where the list of links will be displayed.
            You'll be able to edit or delete them and assign them to categories.
          </p>
          {/* Placeholder for link list */}
           <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <p>Link 1 (Category A)</p>
            <p>Link 2 (Category B)</p>
            <p>Link 3 (Category A)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
