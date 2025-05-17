
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">Manage Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new"> {/* Placeholder link */}
            <Plus className="mr-2 h-4 w-4" /> Add New Category
          </Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is where the list of categories will be displayed.
            You'll be able to edit or delete them.
          </p>
          {/* Placeholder for category list */}
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <p>Category 1</p>
            <p>Category 2</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
