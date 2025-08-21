import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import DonateButton from './DonateButton';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Media', href: '/Media' },
    { name: 'Project', href: '/Project' },
    { name: 'Get Involved', href: '/GetInvolved' },
    { name: 'Contact Us', href: '/Contact' },
    { name: 'Login', href: '/Login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center space-x-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`text-sm font-bold transition-colors hover:text-pink-500 ${
              isActive(item.href) ? 'text-pink-600' : 'text-black'
            }`}
          >
            {item.name}
          </Link>
        ))}
        <DonateButton variant="default" />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="z-[9999]">
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-bold transition-colors hover:text-pink-500 ${
                    isActive(item.href) ? 'text-pink-600' : 'text-black'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <DonateButton className="w-full" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
