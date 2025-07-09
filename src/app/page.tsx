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

export default async function Home() {
  const { hero, services, portfolio, contact } = getPageContent('home.md') as any;

  return (
    <>
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
          <Button size="lg" asChild>
            <a href="#services">
              {hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              {services.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.items.map((service: any) => (
              <Card
                key={service.title}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <CardHeader className="p-0">
                  <Image
                    src={service.imageUrl}
                    data-ai-hint={service.hint}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-headline mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" asChild>
                    <a href="#">
                      Learn More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              {portfolio.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {portfolio.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolio.items.map((item: any) => (
              <a href="#" key={item.title} className="group block overflow-hidden rounded-lg shadow-lg">
                <div className="relative">
                  <Image
                    src={item.imageUrl}
                    data-ai-hint={item.hint}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="aspect-[4/3] object-cover w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold font-headline">{item.title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-full">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      <section id="contact" className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{contact.title}</h2>
                    <div
                      className="prose dark:prose-invert max-w-none text-lg text-muted-foreground mb-8"
                      dangerouslySetInnerHTML={{ __html: await marked(contact.body) }}
                    />
                    <div className="space-y-4 text-muted-foreground">
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p><strong>Address:</strong> {contact.address}</p>
                    </div>
                </div>
                <Card className="p-8 shadow-xl">
                    <ContactForm />
                </Card>
            </div>
        </div>
      </section>
    </>
  );
}
