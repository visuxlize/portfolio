import  { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/images/Logo.png";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const navLinkClass = ({ isActive }) => 
    `relative py-2 text-base font-medium transition-colors duration-300 ${
      isActive 
        ? 'text-accent' 
        : isScrolled ? 'text-[#12284a]' : 'text-[#12284a]'
    }`;

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-gray-50 py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-10 flex items-center">
            <img 
              src={logo}
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
              <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
              <NavLink to="/partnerships" className={navLinkClass}>Partnerships</NavLink>
              <NavLink to="/locations" className={navLinkClass}>Locations</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="flex items-center transition-colors text-[#12284a]"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <a 
                href="tel:+19149486363" 
                className="flex items-center transition-colors text-[12284a]"
              >
                <Phone size={18} className="mr-1" />
                <span className="text-sm font-medium">(914) 948-6363</span>
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className={`${isScrolled || isMenuOpen ? 'text-[#12284a]' : 'text-white'}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className={`z-10 ${isScrolled || isMenuOpen ? 'text-[#12284a]' : 'text-white'}`}
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
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-md p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                  onClick={toggleSearch}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white absolute top-full left-0 w-full shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4">
              <motion.nav 
                className="flex flex-col space-y-4"
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
                  { to: "/resources", label: "Resources" },
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
                          isActive ? 'text-accent' : 'text-[#12284a] hover:text-accent'
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
                className="mt-4 pt-4 border-t flex flex-col space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="tel:+19149486363" className="flex items-center text-[#12284a] transition-colors">
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm font-medium">(914) 948-6363</span>
                </a>
                <a href="/locations" className="flex items-center text-[#12284a] transition-colors">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-sm font-medium">Find Locations</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
