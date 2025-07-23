'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type GalleryItem = {
  title: string;
  description: string;
  imageUrl: string;
  hint: string;
};

type GalleryProps = {
  title: string;
  subtitle: string;
  items: GalleryItem[];
};

export function GalleryPreview({ gallery }: { gallery: GalleryProps }) {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            {gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {gallery.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.items.map((item: any) => (
            <Dialog key={item.title}>
              <DialogTrigger asChild>
                <div className="group block overflow-hidden rounded-lg shadow-lg cursor-pointer">
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
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">{item.title}</DialogTitle>
                  <DialogDescription>{item.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Image
                    src={item.imageUrl}
                    data-ai-hint={item.hint}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className="rounded-lg object-contain w-full h-auto"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
