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
  ['Event', '/Events'],
  ['Contact Us', '/Contact'],
];

const whatWeDoLinks: [string, string][] = [
  ['Enlightenment', '/Enlightenment'],
  ['Enhealthment', '/Enhealthment'],
  ['Empowerment', '/Empowerment'],
];

const getInvolvedLinks: [string, string][] = [
  ['Volunteer', '/GetInvolved'],
  ['Internship', '/GetInvolved'],
  ['Career', '/GetInvolved'],
  ['Partner', '/GetInvolved'],
];

const mediaLinks: [string, string][] = [
  ['Video', '/Media'],
  ['Images', '/Media'],
  ['Magazine', '/Media'],
  ['Blog', '/Media'],
  ['Press', '/Media'],
  ['Podcast', '/Media'],
];

const policyLinks: [string, string][] = [
  ['Privacy Policy', '/PrivacyPolicy'],
  ['Refund Policy', '/RefundPolicy'],
  ['Cancellation Policy ', '/CancellationPolicy'],
  ['Cookies Policy', '/CookiePolicy'],
  ['Terms & Conditions', '/TermsAndConditions'],
  ['POSH Policy', '/POSHPolicy'],
  ['Partnership Policy','PartnershipPolicy'],
  ['FAQ', '/FAQ'],
];

export default function Footer(): JSX.Element {
  const accentColor = 'rgb(219 39 119)';
  const accentColor1 = '#C2185B';

  return (
    <footer className="font-inter text-black">
      {/* Top Section */}
      <div
        className="w-full px-6 lg:px-12 py-12"
        style={{ backgroundColor: '#ffe3ee' }}
      >
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-8 items-start">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col sm:flex-row items-start gap-4 text-left">
            <img
              src="/assets/images/Logo.png"
              alt="We Can Voice For Women Logo"
              className="h-16 w-auto mt-1"
            />
            <div className="flex flex-col text-left">
              <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>
                We Can Voice For Women Foundation
              </h2>
              <p className="text-sm leading-snug mb-3" style={{ color: accentColor1 }}>
                Empowering women through education, health initiatives, and economic opportunities.
              </p>

              {/* Move social icons here, under the paragraph */}
              <div className="flex gap-3" style={{ color: accentColor }}>
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
                    style={{ color: accentColor1 }}
                    to={link}
                    className="hover:underline text-pink-400"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: What We Do + Get Involved */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              What We Do
            </h3>
            <ul className="space-y-2 text-sm mb-5">
              {whatWeDoLinks.map(([label, link]) => (
                <li key={label}>
                  <Link
                    style={{ color: accentColor1 }}
                    to={link}
                    className="hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-2 pb-2 border-b border-pink-300" style={{ color: accentColor }}>
              Get Involved
            </h4>
            <ul className="space-y-2 text-sm">
              {getInvolvedLinks.map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={{
                      pathname: link,
                      search: `?interest=${label.toLowerCase()}`, // optional, if you want query params
                    }}
                    state={{ selectedInterest: label.toLowerCase() }} // pass state outside 'to'
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ color: accentColor1 }}
                    className="hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Column 4: Media */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              Media
            </h3>
            <ul className="space-y-2 text-sm">
              {mediaLinks.map(([label, link]) => (
                <li key={label}>
                  <Link
                    style={{ color: accentColor1 }}
                    to={link}
                    className="hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h3
              className="text-xl font-semibold mb-3 pb-2 border-b border-pink-300"
              style={{ color: accentColor }}
            >
              Contact Us
            </h3>
            <address className="not-italic space-y-3 text-sm" style={{ color: accentColor1 }} >
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base leading-snug">
                  32, 1st Main Road, Ayyappa Nagar, Virugambakkam, Chennai, Tamil Nadu 600092
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9444888197</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
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
          color: accentColor1,
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

          <div className="text-center md:text-right font-medium">
            © {new Date().getFullYear()} We Can Voice For Women Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
