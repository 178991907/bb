
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

// Mock categories for the dropdown - in a real app, fetch these
const mockCategories = [
  { id: 'cat1', name: '常用工具' },
  { id: 'cat2', name: '学习资源' },
  { id: 'cat3', name: '技术博客' },
];

export default function CreateLinkPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(''); // Placeholder for error handling

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // setError('');

    if (!title || !url || !categoryId) {
      // setError('Title, URL, and Category are required.');
      setIsLoading(false);
      alert('Title, URL, and Category are required.');
      return;
    }

    // Basic URL validation (very simple)
    try {
      new URL(url);
    } catch (_) {
      // setError('Please enter a valid URL.');
      setIsLoading(false);
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    // MOCK API CALL
    console.log('Creating link:', { title, url, description, categoryId });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    setIsLoading(false);
    alert('Link created successfully (mock)!');
    router.push('/admin/links');
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
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
            <div className="flex items-center gap-2 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
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
