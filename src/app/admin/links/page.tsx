
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LinkItem } from './new/page'; // Import LinkItem type
import type { Category } from '../categories/page'; // Import Category type

const LOCAL_STORAGE_LINKS_KEY = 'linkHubLinks';
const LOCAL_STORAGE_CATEGORIES_KEY = 'linkHubCategories';

// Initial mock data if localStorage is empty
const initialMockLinks: LinkItem[] = [
  { id: 'L1', title: '搜索 (Baidu)', url: 'https://www.baidu.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu' },
  { id: 'L2', title: '搜索 (Baidu)', url: 'https://www.baidu.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu' },
  { id: 'L3', title: 'guge (Google)', url: 'https://www.google.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google' },
  { id: 'L4', title: '字母游戏', url: '#game-alphabet', categoryId: '2', categoryName: '儿童游戏', createdDate: 'May 17, 2025', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'alphabet game' },
];

export default function AdminLinksPage() {
  const router = useRouter();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCategories = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    const parsedCategories: Category[] = storedCategories ? JSON.parse(storedCategories) : [];
    setCategories(parsedCategories);

    const storedLinks = localStorage.getItem(LOCAL_STORAGE_LINKS_KEY);
    if (storedLinks) {
      const parsedLinks: LinkItem[] = JSON.parse(storedLinks);
      // Ensure categoryName is up-to-date
      const updatedLinks = parsedLinks.map(link => ({
        ...link,
        categoryName: parsedCategories.find(cat => cat.id === link.categoryId)?.name || 'Unknown Category',
      }));
      setLinks(updatedLinks);
    } else {
      // If no links, set initial mock links and update their category names
       const updatedInitialLinks = initialMockLinks.map(link => ({
        ...link,
        categoryName: parsedCategories.find(cat => cat.id === link.categoryId)?.name || link.categoryName || 'Unknown Category',
      }));
      setLinks(updatedInitialLinks);
      localStorage.setItem(LOCAL_STORAGE_LINKS_KEY, JSON.stringify(updatedInitialLinks));
    }
    setIsLoading(false);
  }, []);
  
  const handleEdit = (linkId: string) => {
    router.push(`/admin/links/edit/${linkId}`);
  };

  const handleDelete = (linkId: string) => {
    if (window.confirm('Are you sure you want to delete this link? This action cannot be undone.')) {
      const updatedLinks = links.filter(link => link.id !== linkId);
      setLinks(updatedLinks);
      localStorage.setItem(LOCAL_STORAGE_LINKS_KEY, JSON.stringify(updatedLinks));
      alert('Link deleted successfully (mock)!');
    }
  };
  
  if (isLoading) {
    return <div>Loading links...</div>;
  }

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
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.title}</TableCell>
                  <TableCell>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      {link.url.length > 30 ? `${link.url.substring(0, 30)}...` : link.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{link.categoryName || 'N/A'}</TableCell>
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
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No links found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
