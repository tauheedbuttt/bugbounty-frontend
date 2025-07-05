
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export function NotificationsSettings() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <span className="font-medium">Email Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🔔</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Platform Notifications</span>
                </div>
              </div>
              <span className="text-muted-foreground">Soon</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
