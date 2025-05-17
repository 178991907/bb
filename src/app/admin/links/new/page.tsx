
'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import type { Category } from '@/app/admin/categories/page'; // Import Category type

const LOCAL_STORAGE_LINKS_KEY = 'linkHubLinks';
const LOCAL_STORAGE_CATEGORIES_KEY = 'linkHubCategories';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  categoryId: string;
  categoryName?: string; // Optional, can be derived
  createdDate: string;
  imageUrl?: string; // For frontend display
  aiHint?: string; // For frontend display
}


export default function CreateLinkPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    if (storedCategories) {
      setAvailableCategories(JSON.parse(storedCategories));
    } else {
      // Fallback or prompt to create categories first
      setError('No categories available. Please create a category first.');
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!title || !url || !categoryId) {
      setError('Title, URL, and Category are required.');
      setIsLoading(false);
      return;
    }

    try {
      new URL(url);
    } catch (_) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      setIsLoading(false);
      return;
    }

    const selectedCategory = availableCategories.find(cat => cat.id === categoryId);

    const newLink: LinkItem = {
      id: Date.now().toString(),
      title,
      url,
      description,
      categoryId,
      categoryName: selectedCategory?.name || 'Unknown Category',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      // For new links, imageUrl and aiHint can be empty or have defaults
      imageUrl: `https://placehold.co/120x80.png`, // Default placeholder
      aiHint: title.toLowerCase().split(' ').slice(0,2).join(' ') || 'link icon',
    };

    try {
      const storedLinks = localStorage.getItem(LOCAL_STORAGE_LINKS_KEY);
      const currentLinks: LinkItem[] = storedLinks ? JSON.parse(storedLinks) : [];
      const updatedLinks = [...currentLinks, newLink];
      localStorage.setItem(LOCAL_STORAGE_LINKS_KEY, JSON.stringify(updatedLinks));

      setIsLoading(false);
      alert('Link created successfully!'); // Replace with toast
      router.push('/admin/links');
    } catch (e) {
      setError('Failed to save link. Please try again.');
      setIsLoading(false);
      console.error("Failed to save link to localStorage", e);
    }
  };

  const handleCancel = () => {
    router.push('/admin/links');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleCancel} aria-label="Go back to links">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-primary">Create New Link</h1>
      </div>

      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle>New Link Details</CardTitle>
          <CardDescription>Fill in the information for your new link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. My Favorite Search Engine"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="A short description of the link."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.length > 0 ? (
                    availableCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="disabled" disabled>No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex items-center gap-2 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isLoading || availableCategories.length === 0}>
                {isLoading ? 'Creating...' : 'Create Link'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
