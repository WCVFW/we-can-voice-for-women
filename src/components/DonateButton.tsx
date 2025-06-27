import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DonateButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({
  size = 'default',
  variant = 'default',
  className
}) => {
  return (
    < Button
      size={size}
      variant={variant}
      className={cn('gap-5 sm:gap-3', className)}
      asChild
    >
      <Link
        to="/donate"
        className="flex items-center gap-2 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5" />
        Donate
      </Link>
    </Button >

  );
};

export default DonateButton;