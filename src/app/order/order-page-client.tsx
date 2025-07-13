'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

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
  categories: {
    title: string;
    subcategories: {
      id: string;
      title: string;
      items: MenuItem[];
    }[];
  }[];
};

// This is the Client Component that handles the main page content and interaction.
export const OrderPageComponent: FC<{ content: OrderPageContent }> = ({ content }) => {
  const { title, subtitle, categories } = content;
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem, category: string) => {
    addItem({ ...item, category });
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category.title} className="space-y-12">
            <h2 className="text-4xl font-bold font-headline text-center pb-2 border-b-2 border-primary">{category.title}</h2>
            {category.subcategories.map((subcategory) => (
              <section key={subcategory.id} id={subcategory.id} className="scroll-mt-24">
                <h3 className="text-3xl font-semibold font-headline mb-8">{subcategory.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {subcategory.items.map((item) => (
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
                            <Button size="sm" onClick={() => handleAddToCart(item, category.title)}>Add to Cart</Button>
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
  );
}
