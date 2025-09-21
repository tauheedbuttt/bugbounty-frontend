
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function IBANSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Account Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Fill in your bank account details to receive bounties.
        </p>
        <p className="text-muted-foreground">
          Bounty transfers may take up to 15 days to process.
        </p>
        
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" placeholder="IBAN" />
          </div>
          <Button variant="outline">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
