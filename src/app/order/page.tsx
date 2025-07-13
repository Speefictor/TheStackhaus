'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { getPageContent } from '@/lib/content';
import OrderLayout from './layout';

type MenuItem = {
  name: string;
  price: number;
  imageUrl: string;
  hint: string;
  description?: string;
};

type OrderPageContent = {
  title: string;
  subtitle: string;
  categories: any[];
};

function OrderPageClient({ content }: { content: OrderPageContent }) {
  const { title, subtitle, categories } = content;
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <OrderLayout categories={categories}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="space-y-16">
          {categories.map((category: any) => (
            <div key={category.title}>
              {category.subcategories.map((subcategory: any) => (
                <section key={subcategory.id} id={subcategory.id} className="scroll-mt-20">
                  <h2 className="text-3xl font-bold font-headline mb-8 border-b pb-4">{subcategory.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {subcategory.items.map((item: MenuItem) => (
                      <Card key={item.name} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="p-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            data-ai-hint={item.hint}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </CardHeader>
                        <CardContent className="p-4 flex flex-col flex-grow">
                          <CardTitle className="text-lg font-headline mb-2">{item.name}</CardTitle>
                          {item.description && (
                            <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow">
                              {item.description}
                            </CardDescription>
                          )}
                          <div className="flex justify-between items-center mt-auto">
                             <Badge variant="secondary" className="text-base font-bold">${item.price.toFixed(2)}</Badge>
                             <Button size="sm" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OrderLayout>
  );
}


export default function OrderPage() {
  const content = getPageContent('order.md') as OrderPageContent;
  return <OrderPageClient content={content} />;
}
