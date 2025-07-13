import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold font-headline text-primary mb-4">The Stackhaus</h3>
            <p className="text-sm max-w-xs">Artisanal sandwiches for unforgettable moments. We bring creativity and flavor to every event.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/order" className="hover:text-primary transition-colors">Order Online</Link></li>
              <li><Link href="/#gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <address className="text-sm not-italic space-y-2">
              <p>123 Foodie Lane,<br/> Flavor Town, FT 54321</p>
              <p>
                <a href="mailto:contact@thestackhaus.com" className="hover:text-primary transition-colors">contact@thestackhaus.com</a>
              </p>
               <p>
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </p>
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} The Stackhaus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
