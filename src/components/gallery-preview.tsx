'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < gallery.items.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const currentItem = selectedImageIndex !== null ? gallery.items[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline mb-4">
            {gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {gallery.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.items.map((item, index) => (
            <div
              key={item.title}
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
                  <h3 className="font-headline">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={selectedImageIndex !== null} onOpenChange={handleClose}>
          <DialogContent className="max-w-4xl p-0">
            {currentItem && (
              <div className="relative group">
                <Image
                  src={currentItem.imageUrl}
                  data-ai-hint={currentItem.hint}
                  alt={currentItem.title}
                  width={1200}
                  height={800}
                  className="rounded-t-lg object-contain w-full h-auto max-h-[80vh]"
                />
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-70 group-hover:opacity-100 transition-opacity disabled:opacity-20"
                  onClick={handlePrev}
                  disabled={selectedImageIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-70 group-hover:opacity-100 transition-opacity disabled:opacity-20"
                  onClick={handleNext}
                  disabled={selectedImageIndex === gallery.items.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <DialogHeader className="p-6 text-left">
                  <DialogTitle className="text-2xl font-headline">{currentItem.title}</DialogTitle>
                  <DialogDescription>{currentItem.description}</DialogDescription>
                </DialogHeader>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
