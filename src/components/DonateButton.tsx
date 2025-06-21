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
    <Button
      size={size}
      variant={variant}
      className={cn('gap-1', className)}
      asChild
    >
      <Link to="/donate">
        <Heart className="h-4 w-4" />
        Donate
      </Link>
    </Button>
  );
};

export default DonateButton;