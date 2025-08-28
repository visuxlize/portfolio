import  { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-footer-gradient text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">New Castle Metal</h3>
            <p className="text-gray-300 mb-4">
              If your project needs a commercial, residential or industrial metal roofing supplier, partner with New Castle Metal. Our service area includes New York, New Jersey, Connecticut, Rhode Island, Massachusetts, Vermont, New Hampshire, Maine, Delaware, Eastern Pennsylvania, and south to Baltimore, Maryland.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-accent transition-colors">Products</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-accent transition-colors">Resources</Link></li>
              <li><Link to="/partnerships" className="text-gray-300 hover:text-accent transition-colors">Partnerships</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Locations</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Our Locations</h3>
            <ul className="space-y-2">
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">White Plains, NY</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Long Island City, NY</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Hicksville, NY</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Norwalk, CT</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Mountainside, NJ</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Bensalem, PA</Link></li>
              <li><Link to="/locations" className="text-gray-300 hover:text-accent transition-colors">Baltimore, MD</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0 text-accent" />
                <span>(914) 948-6363</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0 text-accent" />
                <span>info@newcastlemetal.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-accent" />
                <span>Headquarters:<br />535 Old Tarrytown Rd<br />White Plains, NY 10603</span>
              </li>
            </ul>
            <div className="space-y-2">
              <Link to="/contact" className="block w-full bg-accent text-white text-center py-2 rounded hover:bg-accent-dark transition-colors">
                Contact Us
              </Link>
              <Link to="/contact" className="block w-full bg-white text-primary text-center py-2 rounded hover:bg-gray-100 transition-colors">
                Request a Quote
              </Link>
              <Link to="/contact" className="block w-full border border-white text-white text-center py-2 rounded hover:bg-white hover:text-primary transition-colors">
                Request a Contractor
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} New Castle Metal. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
 