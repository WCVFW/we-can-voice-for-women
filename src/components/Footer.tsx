import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white font-inter">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Organization Info */}
          <div>
            <h2 className="text-3xl font-bold mb-5">We Can Voice For Women</h2>
            <p className="text-base leading-relaxed mb-6">
              Empowering women through education, health initiatives, and economic opportunities.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/wecanvoiceforwomen/" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
              <a href="https://x.com/wcvfwf" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com/wecanvoiceforwomen/" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com/@WeCanVoiceforWomen" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <Youtube size={24} />
              </a>
              <a href="https://www.linkedin.com/company/voiceforwomen/?viewAsMember=true" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-5 border-b border-white/30 pb-3">Quick Links</h3>
            <ul className="space-y-3 text-lg">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/About" className="hover:underline">About</Link></li>
              <li><Link to="/Blogs" className="hover:underline">Blogs</Link></li>
              <li><Link to="/Media" className="hover:underline">Media</Link></li>
              <li><Link to="/Events" className="hover:underline">Event</Link></li>
              <li><Link to="/GetInvolved" className="hover:underline">Get Involved</Link></li>
              <li><Link to="/Contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-5 border-b border-white/30 pb-3">Contact Us</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 mt-1" />
                <span>
                  42/57, 3rd Street, Jothiammal Nagar,<br />
                  Saidapet, Chennai, Tamil Nadu 600015
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-6 w-6 mr-3" />
                <span>+91 9444888197</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                <span>support@wecvoiceforwomen.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/30 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <p className="text-base">
            © {new Date().getFullYear()} We Can Voice For Women Foundation. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-base">
            <Link to="/PrivacyPolicy" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
              Privacy Policy
            </Link>
            <Link to="/RefundPolicy" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
              Refund Policy
            </Link>
            <Link to="/CookiePolicy" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
              Cookies Policy
            </Link>
            <Link to="/TermsAndConditions" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
              Terms & Conditions
            </Link>
            <Link to="/FAQ" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
