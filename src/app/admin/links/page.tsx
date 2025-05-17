
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data for links - in a real app, this would come from a database
const mockLinks = [
  { id: '1', title: '搜索', url: 'https://www.baidu.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '2', title: '搜索', url: 'https://www.baidu.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '3', title: 'guge', url: 'https://www.google.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '4', title: 'guge', url: 'https://www.google.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '5', title: 'guge', url: 'https://www.google.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '6', title: 'baidu', url: 'https://www.baidu.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '7', title: 'baidu', url: 'https://www.baidu.com', category: '常用工具', createdDate: 'May 16, 2025' },
  { id: '8', title: '谷歌', url: 'https://www.google.com', category: '常用工具', createdDate: 'May 16, 2025' },
];

export default function AdminLinksPage() {
  const handleEdit = (linkId: string) => {
    // Placeholder for edit functionality
    alert(`Edit link with ID: ${linkId} (mock)`);
  };

  const handleDelete = (linkId: string) => {
    // Placeholder for delete functionality
    // In a real app, you'd show a confirmation dialog first
    alert(`Delete link with ID: ${linkId} (mock)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Links</h1>
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="/admin/links/new">
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Existing Links</CardTitle>
          <CardDescription>View, edit, or delete your links.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.title}</TableCell>
                  <TableCell>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      {link.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{link.category}</TableCell>
                  <TableCell>{link.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(link.id)}
                      aria-label="Edit link"
                      className="mr-2 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(link.id)}
                      aria-label="Delete link"
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mockLinks.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No links found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
