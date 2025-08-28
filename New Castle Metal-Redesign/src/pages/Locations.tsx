import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import locations from '../data/locations';
import { LocationType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>(locations[0]);
  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary text-white">
        <motion.div 
          {...{ className: "absolute inset-0 z-0" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1524283077247-2f14f280ebd0?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwaW5kdXN0cmlhbCUyMHdlbGRpbmd8ZW58MHx8fHwxNzQzMjg0NDk5fDA&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200"
            alt="Industrial workshop"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        </motion.div>
        
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
              <p className="text-xl text-gray-200 mb-6">
                With five strategic locations across the Northeast, we're positioned to serve clients efficiently with local expertise.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Locations Map */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Find a Location Near You</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto">
                Each of our facilities specializes in different aspects of metal fabrication to best serve the unique needs of our clients in each region.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Our Facilities</h3>
                <div className="space-y-4">
                  <AnimatePresence>
                    {locations.map((location, index) => (
                        <motion.button
                        key={location.id}
                        {...{
                          className: `flex items-start w-full text-left p-4 rounded-lg transition-all ${
                            selectedLocation.id === location.id
                              ? 'bg-accent text-white shadow-md'
                              : 'bg-white hover:bg-gray-100'
                          }`
                        }}
                        {...{ onClick: () => setSelectedLocation(location) }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MapPin size={20} className={`mr-3 flex-shrink-0 ${
                          selectedLocation.id === location.id ? 'text-white' : 'text-accent'
                        }`} />
                        <div>
                          <h4 className="font-bold">{location.name}</h4>
                          <p className={selectedLocation.id === location.id ? 'text-gray-200' : 'text-gray-600'}>
                            {location.city}, {location.state}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  {...{ className: "bg-white p-6 rounded-lg shadow-md" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold mb-2 md:mb-0">{selectedLocation.name}</h3>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/contact" className="btn-primary w-full md:w-auto">
                        Contact This Location
                      </Link>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        {...{ className: "overflow-hidden rounded-lg mb-4" }}
                      >
                        <img 
                          src={selectedLocation.image} 
                          alt={selectedLocation.name} 
                          className="w-full h-64 object-cover transition-transform hover:scale-110 duration-500"
                        />
                      </motion.div>
                      <div className="space-y-3">
                        <p className="flex items-start">
                          <MapPin size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                          <span className="text-gray-700">
                            {selectedLocation.address}<br />
                            {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zip}
                          </span>
                        </p>
                        <p className="flex items-start">
                          <Phone size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{selectedLocation.phone}</span>
                        </p>
                        <p className="flex items-start">
                          <Mail size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{selectedLocation.email}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-3">About This Location</h4>
                      <p className="text-gray-600 mb-4">{selectedLocation.description}</p>
                      
                      <h4 className="text-lg font-bold mb-3">Services Offered</h4>
                      <ul className="space-y-2">
                        {selectedLocation.services.map((service, index) => (
                          <motion.li 
                            key={index} 
                            {...{ className: "flex items-start" }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Check size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div 
                    ref={mapRef}
                    className="bg-gray-200 h-64 rounded-lg flex items-center justify-center overflow-hidden"
                  >
                    <motion.div 
                      style={{ textAlign: 'center', padding: '1rem' }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={mapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MapPin size={32} className="mx-auto mb-2 text-accent" />
                      <p className="text-gray-700">Interactive map would be displayed here</p>
                      <p className="text-sm text-gray-500">Location: {selectedLocation.lat}, {selectedLocation.lng}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Locations List */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">All Locations</h2>
              <p className="text-gray-600">
                Find the New Castle Metal facility nearest to you. Each location offers specific expertise and services.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <AnimatedSection key={location.id} delay={index * 0.1}>
                <motion.div 
                  {...{ className: "bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg duration-300" }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="flex items-start">
                        <MapPin size={16} className="mr-2 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-600">
                          {location.city}, {location.state}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <Phone size={16} className="mr-2 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{location.phone}</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedLocation(location);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                      className="text-accent font-medium flex items-center hover:underline"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Need Help Finding the Right Location?</h2>
                <p className="text-gray-200 mb-0">
                  Contact our team for assistance in determining which location is best equipped to handle your specific project requirements.
                </p>
              </div>
              <div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-accent whitespace-nowrap">
                    Contact Us <ArrowRight size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Locations;
 