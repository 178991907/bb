
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { LogoDisplay } from '@/components/dashboard/LogoDisplay';
import { HeaderNav } from '@/components/dashboard/HeaderNav';
import { ToolCard, type Tool } from '@/components/dashboard/ToolCard';

// These values correspond to the defaults in src/app/admin/settings/page.tsx
// In a real app, these would be fetched from a backend/CMS
const siteSettings = {
  siteName: '英语全科启蒙',
  logoUrl: 'https://pic1.imgdb.cn/item/6817c79a58cb8da5c8dc723f.png',
  welcomeMessageEn: 'Welcome to All-Subject English Enlightenment',
  welcomeMessageZh: '系统 (平台) 由 Erin 英语全科启蒙团队独立开发完成',
  footerText: '© 2025 All-Subject English Enlightenment. All rights reserved. 由 Terry 开发和维护',
};

// Define categories - these align with mockCategories in /admin/categories/page.tsx
const homepageCategories = [
  { id: 'cat1', name: '常用工具', slug: 'common-tools' },
  { id: 'cat2', name: '儿童游戏', slug: 'kids-games' },
  // If you add more mock categories in admin and want them on the homepage, add them here.
];

// Define all displayable items (tools/links/games) and map them to a category slug
// This combines and adapts data previously in 'tools', 'games', and admin 'mockLinks'.
const allDisplayItems: (Tool & { categorySlug: string })[] = [
  // Common Tools (adapted from admin/links/page.tsx mockLinks)
  { id: 'L1', title: '搜索 (Baidu)', description: 'Leading Chinese Search Engine', link: 'https://www.baidu.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu', categorySlug: 'common-tools' },
  { id: 'L2', title: '搜索 (Baidu)', description: 'Leading Chinese Search Engine', link: 'https://www.baidu.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu', categorySlug: 'common-tools' },
  { id: 'L3', title: 'guge (Google)', description: 'Global Search Engine', link: 'https://www.google.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google', categorySlug: 'common-tools' },
  { id: 'L4', title: 'guge (Google)', description: 'Global Search Engine', link: 'https://www.google.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google', categorySlug: 'common-tools' },
  { id: 'L5', title: 'guge (Google)', description: 'Global Search Engine', link: 'https://www.google.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google', categorySlug: 'common-tools' },
  { id: 'L6', title: 'baidu', description: 'Another Baidu Search', link: 'https://www.baidu.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu', categorySlug: 'common-tools' },
  { id: 'L7', title: 'baidu', description: 'Yet Another Baidu Search', link: 'https://www.baidu.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search baidu', categorySlug: 'common-tools' },
  { id: 'L8', title: '谷歌 (Google)', description: 'Google Search (Chinese title)', link: 'https://www.google.com', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'search google', categorySlug: 'common-tools' },

  // Kids Games (from previous hardcoded 'games' array)
   { id: 'g1', title: '字母游戏', description: '学习英文字母', link: '#game-alphabet', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'alphabet game', categorySlug: 'kids-games' },
   { id: 'g2', title: '数字配对', description: '有趣的数字游戏', link: '#game-numbers', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'number matching', categorySlug: 'kids-games' },
   { id: 'g3', title: '颜色识别', description: '认识各种颜色', link: '#game-colors', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'color learning', categorySlug: 'kids-games' },
   { id: 'g4', title: '形状认知', description: '探索不同形状', link: '#game-shapes', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'shape puzzle', categorySlug: 'kids-games' },
];


export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderNav />
      
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="mb-8">
          <LogoDisplay logoUrl={siteSettings.logoUrl} siteName={siteSettings.siteName} />
        </div>

        <h1 className="text-5xl font-bold text-foreground mb-3">
          {siteSettings.welcomeMessageEn}
        </h1>
        <p className="text-2xl text-green-600 font-semibold mb-10">
          {siteSettings.welcomeMessageZh}
        </p>
        
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 py-3 text-base h-12 rounded-lg shadow-sm"
            />
          </div>
        </div>

        {homepageCategories.map(category => (
          <section key={category.id} className="mb-16">
            <h2 className="text-3xl font-semibold text-primary mb-8">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allDisplayItems
                .filter(item => item.categorySlug === category.slug)
                .map((item) => (
                  <ToolCard key={item.id} tool={item} />
                ))}
            </div>
            {allDisplayItems.filter(item => item.categorySlug === category.slug).length === 0 && (
              <p className="text-muted-foreground">No items in this category yet.</p>
            )}
          </section>
        ))}
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>
          {siteSettings.footerText}
        </p>
      </footer>
    </div>
  );
}
