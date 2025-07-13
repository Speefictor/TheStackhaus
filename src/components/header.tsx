import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const navLinks = [
    { href: '#order', label: 'Order Online' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-placeholder.svg" alt="The Stackhaus Logo" width={40} height={40} data-ai-hint="logo" />
          <span className="text-xl font-bold font-headline text-primary">
            The Stackhaus
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden sm:block">
            <Button asChild>
                <a href="#order">Order Now</a>
            </Button>
          </div>
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-8">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                     <Image src="/logo-placeholder.svg" alt="The Stackhaus Logo" width={40} height={40} data-ai-hint="logo" />
                     <span className="text-xl font-bold font-headline text-primary">The Stackhaus</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button className="w-full mt-4" asChild>
                    <a href="#order">Order Now</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
