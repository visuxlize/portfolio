import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';

const MotionHeader = motion.header as React.ComponentType<React.HTMLAttributes<HTMLElement> & MotionProps>;

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `relative py-2 text-base font-medium transition-colors duration-300 hover:text-accent ${
      isActive 
        ? 'text-accent' 
        : isScrolled ? 'text-gray-700' : 'text-white'
    }`;

  return (
    <MotionHeader 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-10 flex items-center">
            <img 
              src="./Users/dre/Developer/New Castle Metal-Redesign/Images/images.png" 
              alt="New Castle Metal Logo" 
              className="h-10 md:h-12"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/services" className={navLinkClass}>Services</NavLink>
              <NavLink to="/products" className={navLinkClass}>Products</NavLink>
              <NavLink to="/colors-finishes" className={navLinkClass}>Colors & Finishes</NavLink>
              <NavLink to="/partnerships" className={navLinkClass}>Partnerships</NavLink>
              <NavLink to="/locations" className={navLinkClass}>Locations</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+19144289071" 
                className={`flex items-center hover:text-accent transition-colors ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              >
                <Phone size={18} className="mr-1" />
                <span className="text-sm font-medium">914-428-9071</span>
              </a>
            </div>
          </div>

          <button
            className={`md:hidden z-10 ${isScrolled || isMenuOpen ? 'text-primary' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            {...{ className: "md:hidden bg-white absolute top-full left-0 w-full shadow-md" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4">
              <motion.nav 
                {...{ className: "flex flex-col space-y-4" }}
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: {}
                }}
              >
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About" },
                  { to: "/services", label: "Services" },
                  { to: "/products", label: "Products" },
                  { to: "/colors-finishes", label: "Colors & Finishes" },
                  { to: "/partnerships", label: "Partnerships" },
                  { to: "/locations", label: "Locations" },
                  { to: "/contact", label: "Contact" }
                ].map((link) => (
                  <motion.div
                    key={link.to}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                  >
                    <NavLink 
                      to={link.to} 
                      className={({ isActive }) => 
                        `block py-2 text-base font-medium transition-colors ${
                          isActive ? 'text-accent' : 'text-gray-700 hover:text-accent'
                        }`
                      }
                      end={link.to === "/"}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
              
              <motion.div 
                {...{ className: "mt-4 pt-4 border-t flex flex-col space-y-3" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="tel:+19144289071" className="flex items-center text-primary hover:text-accent transition-colors">
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm font-medium">914-428-9071</span>
                </a>
                <a href="/locations" className="flex items-center text-primary hover:text-accent transition-colors">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-sm font-medium">Find Locations</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionHeader>
  );
};

export default Header;
