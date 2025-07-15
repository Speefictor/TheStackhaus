import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto py-12 md:py-24">
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-500 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Order Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been placed successfully and a confirmation email has been sent to you.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/order">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
