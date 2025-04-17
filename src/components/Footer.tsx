
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-brand-purple" />
              <span className="text-2xl font-bold text-white">
                DriveEasy
              </span>
            </Link>
            <p className="mt-4 text-gray-300">
              Your trusted partner for car rentals. We provide safe, reliable, and affordable vehicles for all your travel needs.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-white transition-colors">Cars</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-purple shrink-0 mt-0.5 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
                <span className="text-gray-300">Rajkot , Gujrat</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-purple shrink-0 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
                <span className="text-gray-300">9265745667</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-purple shrink-0 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
                <span className="text-gray-300">krushalpatel193@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
