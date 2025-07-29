'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    // Set initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navLinks = [
    { href: '/order', label: 'Order Online' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#about', label: 'About' },
  ];

  const renderNavLinks = (isMobile = false) => {
    return navLinks.map((link) => {
      const isHomePage = pathname === '/';
      const isHashLink = link.href.startsWith('/#');
      const isActive =
        (!isHashLink && pathname === link.href) ||
        (isHomePage && isHashLink && activeHash === link.href.substring(1));

      return (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            isActive ? 'text-primary font-semibold' : '',
            isMobile ? 'text-lg' : 'text-sm font-medium'
          )}
        >
          {link.label}
        </Link>
      );
    });
  };

  if (!hasMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-32 bg-muted rounded animate-pulse"></div>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                <div className="h-10 w-10 md:hidden bg-muted rounded-full animate-pulse"></div>
            </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="The Stackhaus Logo" width={150} height={40} className="h-10 w-auto" priority />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
        </nav>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Open Cart</span>
          </Button>
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
                     <Image src="/logo.png" alt="The Stackhaus Logo" width={150} height={40} className="h-10 w-auto" />
                  </Link>
                  {renderNavLinks(true)}
                  <Button className="w-full mt-4" asChild>
                    <Link href="/order">Order Now</Link>
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
