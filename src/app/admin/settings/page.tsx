
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Settings</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage general application settings here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="My Awesome Link Hub" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Administrator Email</Label>
            <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the public site.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Theme options and other appearance settings will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
