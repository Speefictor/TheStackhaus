import { getPageContent } from '@/lib/content';
import { OrderLayoutClient } from './order-layout-client';
import { OrderPageComponent } from './order-page-client';

// Define the types for the page content
type MenuItem = {
  name: string;
  price: number;
  imageUrl: string;
  hint: string;
  description?: string;
};

type Subcategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

type Category = {
  title: string;
  subcategories: Subcategory[];
};

type OrderPageContent = {
  title: string;
  subtitle: string;
  categories: Category[];
};

// This is the main Server Component for the /order route.
// It is responsible for fetching all data from the CMS.
export default function OrderPage() {
  // Fetch the page content once.
  const content = getPageContent('order.md') as OrderPageContent;

  return (
    // The server component passes the fetched content down to two separate
    // client components: one for the layout (sidebar) and one for the main page content.
    // This ensures that the data-fetching logic remains strictly on the server.
    <OrderLayoutClient categories={content.categories}>
      <OrderPageComponent content={content} />
    </OrderLayoutClient>
  );
}
