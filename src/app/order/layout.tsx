import { getPageContent } from '@/lib/content';
import { OrderLayoutClient } from './order-layout-client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Category = {
  title: string;
  subcategories: {
    id: string;
    title: string;
  }[];
};

type OrderPageContent = {
  categories: Category[];
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = getPageContent('order.md') as OrderPageContent;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <OrderLayoutClient categories={content.categories}>
          {children}
        </OrderLayoutClient>
      </main>
      <Footer />
    </div>
  );
}
