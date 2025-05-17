
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(''); // Placeholder for error handling

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    // Auto-generate slug from name (simple version)
    setSlug(newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // setError('');

    // Basic validation
    if (!name || !slug) {
      // setError('Name and Slug are required.');
      setIsLoading(false);
      // In a real app, use toast notifications for errors
      alert('Name and Slug are required.');
      return;
    }

    // MOCK API CALL
    console.log('Creating category:', { name, slug, icon });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    // In a real app, show a success toast and redirect
    alert('Category created successfully (mock)!');
    router.push('/admin/categories'); 
  };

  const handleCancel = () => {
    router.push('/admin/categories');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleCancel} aria-label="Go back to categories">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-primary">Create Category</h1>
      </div>

      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle>New Category Details</CardTitle>
          <CardDescription>Fill in the information for your new category.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Development"
                value={name}
                onChange={handleNameChange}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                type="text"
                placeholder="e.g. development"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="h-10"
                aria-describedby="slug-description"
              />
              <p id="slug-description" className="text-xs text-muted-foreground">
                The slug is the URL-friendly version of the name. It should be unique.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (optional)</Label>
              <Input
                id="icon"
                type="text"
                placeholder="e.g. code (Lucide icon name or SVG path)"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="h-10"
              />
               <p className="text-xs text-muted-foreground">
                Optionally provide a Lucide icon name (e.g., `Code`, `Link`) or an SVG path data.
              </p>
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
                {isLoading ? 'Creating...' : 'Create Category'}
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
