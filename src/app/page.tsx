
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

const tools: Tool[] = [
  { id: '1', title: 'baidu', description: '搜索引擎', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
  { id: '2', title: 'baidu', description: '搜索引擎', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
  { id: '3', title: 'guge', description: '搜索引擎', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
  { id: '4', title: 'guge', description: '搜索引擎', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
  { id: '5', title: 'guge', description: '搜索引擎', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
  { id: '6', title: '搜索', description: '搜索搜索搜索', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'education logo' },
  { id: '7', title: '搜索', description: '搜索搜索搜索', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'education logo' },
  { id: '8', title: '谷歌', description: '1111', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'search engine' },
];

const games: Tool[] = [
   { id: 'g1', title: '字母游戏', description: '学习英文字母', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'alphabet game' },
   { id: 'g2', title: '数字配对', description: '有趣的数字游戏', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'number matching' },
   { id: 'g3', title: '颜色识别', description: '认识各种颜色', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'color learning' },
   { id: 'g4', title: '形状认知', description: '探索不同形状', link: '#', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'shape puzzle' },
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

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-600 mb-8">常用工具</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-green-600 mb-8">儿童游戏</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <ToolCard key={game.id} tool={game} />
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>
          {siteSettings.footerText}
        </p>
      </footer>
    </div>
  );
}
