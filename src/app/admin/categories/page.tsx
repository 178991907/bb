
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for categories - in a real app, this would come from a database
const mockCategories = [
  { id: '1', name: '常用工具', slug: 'common-tools', createdDate: 'May 16, 2025' },
  { id: '2', name: '儿童游戏', slug: 'kids-games', createdDate: 'May 16, 2025' },
  // Add more mock categories as needed
];

export default function AdminCategoriesPage() {
  const handleEdit = (categoryId: string) => {
    // Placeholder for edit functionality
    // router.push(`/admin/categories/edit/${categoryId}`);
    alert(`Edit category with ID: ${categoryId} (mock)`);
  };

  const handleDelete = (categoryId: string) => {
    // Placeholder for delete functionality
    // In a real app, you'd show a confirmation dialog first
    alert(`Delete category with ID: ${categoryId} (mock)`);
  };

  const handleReorder = () => {
    // Placeholder for reorder functionality
    alert('Reorder categories (mock)');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Categories</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReorder}>
            <ArrowUpDown className="mr-2 h-4 w-4" /> Reorder
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Link>
          </Button>
        </div>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          {/* CardTitle and CardDescription can be removed or kept as per final design preference */}
          {/* <CardTitle>Existing Categories</CardTitle> */}
          {/* <CardDescription>View, edit, or delete your categories.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category.id)}
                      aria-label="Edit category"
                      className="mr-2 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                      aria-label="Delete category"
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mockCategories.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No categories found. Add one to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
