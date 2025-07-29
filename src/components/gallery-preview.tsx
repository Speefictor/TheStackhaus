
'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

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
  const [open, setOpen] = useState(false);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(selectedIndex, true);
    }
  }, [open, selectedIndex, emblaApi]);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light font-headline mb-4">
            {gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {gallery.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group block overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleOpen(index)}
            >
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
                  <h3 className="font-light font-headline">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl w-full p-0 flex items-center justify-center">
             <DialogTitle className="sr-only">{gallery.items[selectedIndex]?.title}</DialogTitle>
             <DialogDescription className="sr-only">{gallery.items[selectedIndex]?.description}</DialogDescription>
            <Carousel setApi={setEmblaApi} opts={{ startIndex: selectedIndex, loop: true }} className="w-full">
                <CarouselContent>
                  {gallery.items.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={item.imageUrl}
                            data-ai-hint={item.hint}
                            alt={item.title}
                            width={1200}
                            height={800}
                            className="rounded-lg object-contain w-auto h-auto max-h-[70vh] max-w-full"
                          />
                        </div>
                         <div className="text-center mt-4 p-4">
                            <h3 className="text-xl font-headline">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
