import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white font-inter">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div>
            <h2 className="text-2xl font-bold mb-3">We Can Voice For Women Foundation</h2>
            <p className="text-sm leading-snug mb-4">
              Empowering women through education, health initiatives, and economic opportunities.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/wecanvoiceforwomen/" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/wcvfwf" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/wecanvoiceforwomen/" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@WeCanVoiceforWomen" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
              <a href="https://www.linkedin.com/company/voiceforwomen/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Home', '/'],
                ['About', '/About'],
                ['Blogs', '/Blogs'],
                ['Media', '/Media'],
                ['Event', '/Events'],
                ['Get Involved', '/GetInvolved'],
                ['Contact Us', '/Contact'],
              ].map(([label, link]) => (
                <li key={link}>
                  <Link to={link} className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>
                  32, 1st St, Sri Ayyappa Nagar, Chinmaya Nagar Stage II Extension, Kumaran Nagar, Virugambakkam, Chennai, Tamil Nadu 600092
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9444888197</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@wecanvoiceforwomen.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-white/30 px-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 text-left">
          <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-4 text-xs sm:text-sm">
            {[
              ['Privacy Policy', '/PrivacyPolicy'],
              ['Refund Policy', '/RefundPolicy'],
              ['Cookies Policy', '/CookiePolicy'],
              ['Terms & Conditions', '/TermsAndConditions'],
              ['FAQ', '/FAQ'],
            ].map(([label, link]) => (
              <Link key={link} to={link} className="hover:underline" onClick={() => window.scrollTo(0, 0)}>
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-200 text-center w-full lg:w-auto">
            © {new Date().getFullYear()} We Can Voice For Women Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
