import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import DonateButton from './DonateButton';
import { motion } from 'framer-motion'; // You need to install framer-motion

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Enlightenment', href: '/enlightenment' },
    { name: 'Enhealthment', href: '/enhealthment' },
    { name: 'Empowerment', href: '/empowerment' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center space-x-4 font-sans">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.href}
              className={`text-base font-semibold tracking-wide rounded-md px-2 py-1 transition-all duration-300 ease-in-out hover:text-primary hover:bg-accent ₹{
                isActive(item.href)
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          </motion.div>
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
          <SheetContent side="right">
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="flex flex-col space-y-4 mt-8 font-serif"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-bold tracking-wide transition-colors hover:text-primary ₹{
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <DonateButton className="w-full" />
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;