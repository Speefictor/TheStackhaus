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
        <div id="sep" style={{textAlign:"center",alignItems:"center",position:"relative",margin:"0 auto"}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-beige">
            <svg width="107" height="7" viewBox="0 0 107 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{textAlign:"center"}}>
              <path d="M56.6797 3.27466C56.6797 4.95833 55.3399 6.2981 53.6562 6.2981C51.9726 6.2981 50.6328 4.95833 50.6328 3.27466C50.6328 1.59099 51.9726 0.251221 53.6562 0.251221C55.3399 0.251221 56.6797 1.59099 56.6797 3.27466Z" fill="currentColor" data-darkreader-inline-fill="" ></path>
              <path d="M106.883 3.27459H61.9253H106.883ZM106.883 3.18488C103.088 3.03575 99.4767 2.94604 95.6891 2.82721L90.0887 2.67808L84.312 2.58837C82.5063 2.55807 80.5172 2.46953 78.7115 2.40894C76.9059 2.34953 74.9167 2.34953 73.1111 2.40894C71.3054 2.46836 69.3163 2.52778 67.5106 2.64778C65.7049 2.76662 63.7158 2.91575 61.9102 3.18489V3.36431C63.7158 3.60315 65.7049 3.75229 67.5106 3.90142C69.3163 4.02025 71.3054 4.10997 73.1111 4.14026C74.9167 4.19968 76.9059 4.19968 78.7115 4.14026C80.5172 4.08084 82.5063 4.02142 84.312 3.96084L89.9124 3.842L95.5129 3.69287C99.3077 3.57403 102.919 3.48432 106.707 3.3352L106.7 3.1849L106.883 3.18488Z" fill="currentColor" data-darkreader-inline-fill="" ></path>
              <path d="M0.480469 3.27447H45.438H0.480469ZM0.480469 3.18476C4.27526 3.03563 7.8866 2.94592 11.6742 2.82708L17.2746 2.67795L23.0513 2.58824C24.857 2.55795 26.8461 2.4694 28.6518 2.40882C30.4574 2.3494 32.4465 2.3494 34.2522 2.40882C36.0579 2.46824 38.047 2.52766 39.8527 2.64766C41.6583 2.7665 43.6475 2.91563 45.4531 3.18477V3.36419C43.6475 3.60303 41.6583 3.75216 39.8527 3.90129C38.047 4.02013 36.0579 4.10984 34.2522 4.14013C32.4465 4.19955 30.4574 4.19955 28.6518 4.14013C26.8461 4.08072 24.857 4.0213 23.0513 3.96071L17.4508 3.84188L11.8504 3.69275C8.0556 3.57391 4.44427 3.4842 0.656708 3.33507L0.663761 3.18478L0.480469 3.18476Z" fill="currentColor" data-darkreader-inline-fill=""></path>
            </svg>
          </div>
        </div>
        </div>
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
