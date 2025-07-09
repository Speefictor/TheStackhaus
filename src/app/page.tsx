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

export default function Home() {
  const services = [
    {
      title: 'Corporate Catering',
      description:
        'Elevate your meetings and events with our fresh, delicious, and reliable corporate catering services.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'corporate catering'
    },
    {
      title: 'Private Events',
      description:
        'From intimate gatherings to grand celebrations, we provide bespoke menus to make your event unforgettable.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'wedding party'
    },
    {
      title: 'Boxed Lunches',
      description:
        'Convenient, gourmet boxed lunches perfect for any occasion, delivered right to your office or event.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'lunch box'
    },
  ];

  const portfolio = [
    {
      title: 'Lakeside Wedding',
      description: 'An elegant reception featuring a custom menu with stunning lake views.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'wedding reception'
    },
    {
      title: 'Tech Conference 2023',
      description: 'Provided energizing meals and snacks for over 500 attendees at a major tech conference.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'business conference'
    },
    {
      title: 'Annual Charity Gala',
      description: 'A sophisticated multi-course dinner for a high-profile fundraising event.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'gala dinner'
    },
     {
      title: 'Garden Birthday Party',
      description: 'A whimsical and delicious spread for a sunny outdoor birthday celebration.',
      imageUrl: 'https://placehold.co/600x400.png',
      hint: 'garden party'
    },
  ];

  return (
    <>
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="A beautifully arranged dining table for an event"
          data-ai-hint="catering event"
          fill
          className="object-cover -z-10 brightness-50"
        />
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg mb-4">
            Artisanal Catering for Unforgettable Moments
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md mb-8">
            We blend culinary artistry with impeccable service to create
            extraordinary experiences.
          </p>
          <Button size="lg" asChild>
            <a href="#services">
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whatever the occasion, we deliver exceptional food and service
              tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
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
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into some of the beautiful events we've had the pleasure
              of being a part of.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolio.map((item) => (
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
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Get in Touch</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Have an event in mind? We'd love to hear from you. Fill out the form, and we'll get back to you shortly to discuss how we can make your event a delicious success.
                    </p>
                    <div className="space-y-4 text-muted-foreground">
                        <p><strong>Email:</strong> contact@gourmondoclone.com</p>
                        <p><strong>Phone:</strong> (123) 456-7890</p>
                        <p><strong>Address:</strong> 123 Foodie Lane, Flavor Town, FT 54321</p>
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
