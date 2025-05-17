
'use client'; // This page now needs to be a client component to use localStorage

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { LogoDisplay } from '@/components/dashboard/LogoDisplay';
import { HeaderNav } from '@/components/dashboard/HeaderNav';
import { ToolCard, type Tool } from '@/components/dashboard/ToolCard';
import type { Category } from '@/app/admin/categories/page';
import type { LinkItem } from '@/app/admin/links/new/page';

// These values correspond to the defaults in src/app/admin/settings/page.tsx
// For the logo, we'll use an empty string to trigger the fallback in LogoDisplay to match the image.
const siteSettings = {
  siteName: '英语全科启蒙', // This is used if logo fallback text is needed
  logoUrl: '', // Set to empty to use the KeTErin logo from LogoDisplay fallback
  welcomeMessageEn: 'Welcome to All-Subject English Enlightenment',
  welcomeMessageZh: '系统 (平台) 由 Erin 英语全科启蒙团队独立开发完成',
  footerText: '© 2025 All-Subject English Enlightenment. All rights reserved. 由 Terry 开发和维护',
};

const LOCAL_STORAGE_CATEGORIES_KEY = 'linkHubCategories';
const LOCAL_STORAGE_LINKS_KEY = 'linkHubLinks';

// Initial mock data (will be overridden by localStorage if available)
const initialMockCategories: Category[] = [
  { id: '1', name: '常用工具', slug: 'common-tools', createdDate: 'May 16, 2025', icon: 'tool' },
  { id: '2', name: '儿童游戏', slug: 'kids-games', createdDate: 'May 16, 2025', icon: 'gamepad-2' },
];

const initialMockLinks: LinkItem[] = [
  { id: 'L1', title: '搜索 (Baidu)', url: 'https://www.baidu.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu', description: 'Leading Chinese Search Engine' },
  { id: 'L3', title: 'guge (Google)', url: 'https://www.google.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google', description: 'Global Search Engine' },
  { id: 'g1', title: '字母游戏', url: '#game-alphabet', categoryId: '2', categoryName: '儿童游戏', createdDate: 'May 17, 2025', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'alphabet game', description: '学习英文字母' },
  // Example of a card with no image, but title and description to match image "谷歌 1111"
  { id: 'L4', title: '谷歌', url: 'https://www.google.com', categoryId: '1', categoryName: '常用工具', createdDate: 'May 16, 2025', imageUrl: '', aiHint: 'search example', description: '1111' },
];


export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch categories from localStorage
    const storedCategories = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    const loadedCategories = storedCategories ? JSON.parse(storedCategories) : initialMockCategories;
    setCategories(loadedCategories);
    if (!storedCategories) {
        localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(initialMockCategories));
    }

    // Fetch links from localStorage
    const storedLinks = localStorage.getItem(LOCAL_STORAGE_LINKS_KEY);
    const loadedLinks = storedLinks ? JSON.parse(storedLinks) : initialMockLinks;
     // Ensure categoryName is present or derived
    const updatedLinks = loadedLinks.map((link: LinkItem) => ({
      ...link,
      categoryName: loadedCategories.find((cat: Category) => cat.id === link.categoryId)?.name || link.categoryName || 'Unknown Category',
    }));
    setLinks(updatedLinks);
     if (!storedLinks) {
        localStorage.setItem(LOCAL_STORAGE_LINKS_KEY, JSON.stringify(updatedLinks));
    }

    setIsLoading(false);
  }, []);

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderNav />

      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="mb-8">
          <LogoDisplay logoUrl={siteSettings.logoUrl} siteName={siteSettings.siteName} />
        </div>

        <h1 className="text-5xl font-bold text-foreground mb-4">
          Hello
        </h1>
        <p className="text-3xl text-primary font-semibold mb-2">
          {siteSettings.welcomeMessageEn}
        </p>
        <p className="text-xl text-accent mb-12"> {/* text-accent for orange */}
          {siteSettings.welcomeMessageZh}
        </p>

        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 py-3 text-base h-12 rounded-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {categories.map(category => {
          const itemsForCategory = filteredLinks.filter(item => item.categoryId === category.id);
          if (itemsForCategory.length === 0 && searchTerm) return null; // Hide category if search yields no results for it

          return (
            <section key={category.id} className="mb-16">
              <h2 className="text-3xl font-semibold text-primary mb-8">{category.name}</h2>
              {itemsForCategory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {itemsForCategory.map((item) => {
                    // Adapt LinkItem to Tool interface for ToolCard
                    const toolItem: Tool = {
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      link: item.url,
                      imageUrl: item.imageUrl || '', // Pass empty string if no image
                      aiHint: item.aiHint || 'icon',
                    };
                    return <ToolCard key={item.id} tool={toolItem} />;
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {searchTerm ? `No items match your search in "${category.name}".` : `No items in this category yet.`}
                </p>
              )}
            </section>
          );
        })}
         {categories.length === 0 && (
           <p className="text-muted-foreground text-xl">No categories have been set up yet.</p>
         )}
         {categories.length > 0 && filteredLinks.length === 0 && searchTerm && (
            <p className="text-muted-foreground text-xl mt-8">No links match your search term &quot;{searchTerm}&quot;.</p>
         )}

      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>
          {siteSettings.footerText}
        </p>
      </footer>
    </div>
  );
}
