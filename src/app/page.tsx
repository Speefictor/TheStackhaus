import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { ArrowRight } from 'lucide-react';
import { getPageContent } from '@/lib/content';
import { marked } from 'marked';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GalleryPreview } from '@/components/gallery-preview';

export default async function Home() {
  const { hero, order, gallery, about } = getPageContent('home.md') as any;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
          <Image
            src={hero.image}
            alt="A beautifully arranged dining table for an event"
            data-ai-hint={hero.imageHint}
            fill
            className="object-cover -z-10 brightness-50"
          />
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg mb-4">
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md mb-8">
              {hero.subtitle}
            </p>
            <Button
              size="lg"
              asChild
              className="shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-primary/40 transition-all duration-300"
            >
              <Link href="/order">
                {hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="order" className="py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                {order.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {order.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {order.items.map((item: any) => (
                <Card
                  key={item.title}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={item.imageUrl}
                      data-ai-hint={item.hint}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="aspect-[3/2] object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-headline mb-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild>
                      <Link href="/order">
                        Order Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <GalleryPreview gallery={gallery} />
        
        <section id="about" className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                   <div>
                      <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-center">{about.title}</h2>
                      <div
                        className="prose dark:prose-invert max-w-none text-lg text-muted-foreground mb-8"
                        dangerouslySetInnerHTML={{ __html: await marked(about.body) }}
                      />
                      <div className="space-y-4 text-muted-foreground text-center">
                          <p><strong>Email:</strong> {about.email}</p>
                          <p><strong>Phone:</strong> {about.phone}</p>
                          <p><strong>Address:</strong> {about.address}</p>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
