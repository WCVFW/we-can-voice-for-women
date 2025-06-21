import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Heart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Organization Info */}
      <div>
        <h2 className="text-2xl font-bold mb-4">We Can Voice For Women</h2>
        <p className="text-white mb-4">
          Empowering women through education, health initiatives, and economic opportunities.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-white transition-colors">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-white hover:text-white transition-colors">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-white hover:text-white transition-colors">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-white hover:text-white transition-colors">
            <Youtube size={20} />
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-white hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/enlightenment" className="text-white hover:text-white transition-colors">
              Enlightenment
            </Link>
          </li>
          <li>
            <Link to="/enhealthment" className="text-white hover:text-white transition-colors">
              Enhealthment
            </Link>
          </li>
          <li>
            <Link to="/empowerment" className="text-white hover:text-white transition-colors">
              Empowerment
            </Link>
          </li>
          <li>
            <Link to="/donate" className="text-white hover:text-white transition-colors">
              Donate
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Contact Us
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <MapPin className="h-5 w-5 text-white mr-2 mt-0.5" />
            <span className="text-white">
              42/57, 3rd Streer, Jothiammal Nagar Saidapet, Chennai,<br />
              Tamil Nadu 600015<br />
            </span>
          </li>
          <li className="flex items-center">
            <Phone className="h-5 w-5 text-white mr-2" />
            <span className="text-white">+91 9840584463</span>
          </li>
          <li className="flex items-center">
            <Mail className="h-5 w-5 text-white mr-2" />
            <span className="text-white">support@wecvoiceforwomen.org</span>
          </li>
        </ul>
      </div>

      {/* Get Involved */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Get Involved
        </h3>
        <div className="space-y-4">
          <p className="text-white">
            Join our mission to empower women worldwide through volunteering, donating, or spreading awareness.
          </p>
          <Button className="w-full flex items-center justify-center gap-2">
            <Heart className="h-4 w-4" />
            Support Our Cause
          </Button>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
      <p className="text-white text-sm mb-4 md:mb-0">
        © {new Date().getFullYear()} We Can Voice For Women Fuondation. All rights reserved.
      </p>
      <div className="flex space-x-6">
        <a href="#" className="text-sm text-white hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="text-sm text-white hover:text-white transition-colors">
          Terms of Service
        </a>
        <a href="#" className="text-sm text-white hover:text-white transition-colors">
          Cookie Policy
        </a>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;