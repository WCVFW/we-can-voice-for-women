import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Linkedin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks: [string, string][] = [
  ['Home', '/'],
  ['About', '/About'],
  ['Blogs', '/Blogs'],
  ['Media', '/Media'],
  ['Event', '/Events'],
  ['Get Involved', '/GetInvolved'],
  ['Contact Us', '/Contact'],
];

const whatWeDoLinks: [string, string][] = [
  ['Enlightenment', '/Enlightenment'],
  ['Enhealthment', '/Enhealthment'],
  ['Empowerment', '/Empowerment'],
];

const policyLinks: [string, string][] = [
  ['Privacy Policy', '/PrivacyPolicy'],
  ['Refund Policy', '/RefundPolicy'],
  ['Cookies Policy', '/CookiePolicy'],
  ['Terms & Conditions', '/TermsAndConditions'],
  ['FAQ', '/FAQ'],
];

export default function Footer(): JSX.Element {
  const accentColor = '#c2185b';

  return (
    <footer className="font-inter text-black">
      {/* Top Section */}
      <div
        className="w-full px-6 lg:px-12 py-12"
        style={{ backgroundColor: '#ffe3ee' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-8 items-start">
          {/* Column 1: Logo & Info */}
          <div className="flex items-start gap-4 text-left">
            <img
              src="/assets/images/Logo.png"
              alt="We Can Voice For Women Logo"
              className="h-16 w-auto mt-1"
            />
            <div className="flex justify-center">
              <div style={{ color: accentColor }} className="text-left">
                <h2 className="text-2xl font-bold mb-3">
                  We Can Voice For Women Foundation
                </h2>
                <p className="text-sm leading-snug">
                  Empowering women through education, health initiatives, and economic opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(([label, link]) => (
                <li key={link}>
                  <Link
                    to={link}
                    className="hover:underline text-black"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: What We Do */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              What We Do
            </h3>
            <ul className="space-y-2 text-sm">
              {whatWeDoLinks.map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="hover:underline text-black"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              Contact Us
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-2 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <span className="text-sm md:text-base leading-snug">
                  32, 1st Main Road, Ayyappa Nagar, Chinmaya Nagar Stage II Extension, Virugambakkam, Chennai, Tamil Nadu 600092
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" style={{ color: accentColor }} />
                <span>+91 9444888197</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" style={{ color: accentColor }} />
                <span>support@wecanvoiceforwomen.org</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="w-full px-6 py-6 text-sm -mt-6"
        style={{
          backgroundColor: '#f9afc9',
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
          color: accentColor,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {policyLinks.map(([label, link]) => (
              <Link
                key={link}
                to={link}
                className="hover:underline"
                onClick={() => window.scrollTo(0, 0)}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <a href="https://www.facebook.com/wecanvoiceforwomen/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://x.com/wcvfwf" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://www.instagram.com/wecanvoiceforwomen/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@WeCanVoiceforWomen" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href="https://www.linkedin.com/company/voiceforwomen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>

          <div className="text-center md:text-right font-medium">
            © {new Date().getFullYear()} We Can Voice For Women Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
