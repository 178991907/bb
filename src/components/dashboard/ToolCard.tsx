import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  aiHint?: string;
  link: string;
}

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{tool.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow text-left space-y-2">
        {tool.imageUrl && (
          <div className="aspect-video relative w-full mb-2 bg-muted rounded overflow-hidden">
            <Image
              src={tool.imageUrl}
              alt={tool.title}
              fill
              className="object-contain"
              data-ai-hint={tool.aiHint || "icon"}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            />
          </div>
        )}
        {tool.description && (
            <p className="text-sm text-muted-foreground">{tool.description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit Site
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
