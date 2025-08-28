import  { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import drexel from "../assets/images/Drexel-Metals.jpg";
import pacclad from "../assets/images/Pacclad.jpg";
import unaclad from "../assets/images/UNA_CLAD.jpg";
import vm from "../assets/images/vmzinc.jpg";

const Home = () => {
  const [partnersRef, partnersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            style={{ width: '100%', height: '100%' }}
          >
            <img 
              src="./Users/dre/Developer/New Castle Metal-Redesign/Images/DJI_0355-scaled2.jpg"
              alt="Axel Towers - Commercial metal roofing architecture" 
              className="object-cover w-full h-full"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            {...{ className: "max-w-lg bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              {...{ className: "text-4xl md:text-6xl font-bold mb-6 text-white leading-tight" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We Are<br />New Castle Metal
            </motion.h1>
            <motion.p 
              {...{ className: "text-xl md:text-2xl mb-8 text-gray-200" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premier metal roofing and fabrication solutions for commercial, industrial, and residential projects
            </motion.p>
            <motion.div 
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/products" className="btn-accent">
                View Products <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About New Castle Metal</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                New Castle Metal is your premier local fabricator of exterior architectural metals for Commercial, Industrial and Residential projects. We specialize in standing seam metal roofing systems, perimeter and edge metal systems, and custom fabrication. NCM proudly serves the Northeast Region, including New York, New Jersey, Connecticut, Rhode Island, Massachusetts, Vermont, New Hampshire, Maine, Delaware, Eastern Pennsylvania, and south to Baltimore, Maryland. Our website includes our full line of product offerings, portfolio of jobs, and industry updates. For more information please call one of our locations or submit a form and someone will contact you soon.
              </p>
              <Link to="/about" className="btn-primary">
                Learn More About Us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Services</h2>
              <p className="text-gray-600">Comprehensive metal fabrication solutions for all your project needs</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1} animation="slideUp">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZXRhbCUyMHJvb2ZpbmclMjBpbmR1c3RyaWFsJTIwY29tbWVyY2lhbCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NDMyOTIwNzF8MA&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920" 
                    alt="Standing Seam Metal Roofing" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">Standing Seam Metal Roofing</h3>
                  <p className="text-gray-600 mb-4">Custom design and fabrication of standing seam metal roofing systems for superior performance and aesthetic appeal.</p>
                  <Link 
                    to="/services" 
                    className="text-accent font-medium flex items-center hover:underline"
                  >
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} animation="slideUp">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMHJvb2ZpbmclMjBpbmR1c3RyaWFsJTIwY29tbWVyY2lhbCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NDMyOTIwNzF8MA&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920" 
                    alt="Metal Roof Edge Systems" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">Perimeter Metal Systems</h3>
                  <p className="text-gray-600 mb-4">Engineered edge metal systems for secure, watertight terminations for all types of roofing applications.</p>
                  <Link 
                    to="/services" 
                    className="text-accent font-medium flex items-center hover:underline"
                  >
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} animation="slideUp">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1597361819042-e65629dca1ba?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHJvb2ZpbmclMjBzdGFuZGluZyUyMHNlYW0lMjBjb21tZXJjaWFsfGVufDB8fHx8MTc0MzI4NTU2MHww&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200" 
                    alt="Custom Metal Fabrication" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">Custom Metal Fabrication</h3>
                  <p className="text-gray-600 mb-4">Specialized metal fabrication services for unique architectural elements and custom applications.</p>
                  <Link 
                    to="/services" 
                    className="text-accent font-medium flex items-center hover:underline"
                  >
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <Link to="/services" className="btn-primary">
                View All Services <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16" ref={partnersRef}>
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Partnerships</h2>
              <p className="text-gray-600">
                We partner with industry-leading manufacturers to ensure the highest quality materials and warranty coverage for your projects.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Drexel Metals", logo: drexel},
              { name: "PAC-CLAD", logo: pacclad} ,
              { name: "Una-Clad", logo: unaclad},
              { name: "VMZinc", logo: vm},
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                {...{ className: "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center" }}
              >
                <img 
                  src='{partner.logo}'
                  alt={`${partner.name} logo`} 
                  className="h-16 object-contain" 
                />
              </motion.div>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="text-center mt-8">
              <Link to="/partnerships" className="text-accent font-medium flex items-center justify-center hover:underline">
                View All Partnerships <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <AnimatedSection animation="slideInLeft" className="mb-8 md:mb-0 md:mr-8 md:max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-200 mb-6">
                Contact us today for a free consultation and quote. Our team is ready to bring your vision to life with expert metal fabrication and installation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check size={20} className="mr-2 text-accent flex-shrink-0 mt-1" />
                  <span>Custom fabrication to your exact specifications</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 text-accent flex-shrink-0 mt-1" />
                  <span>Expert installation by certified professionals</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 text-accent flex-shrink-0 mt-1" />
                  <span>Comprehensive warranty coverage</span>
                </li>
              </ul>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight" className="md:flex-shrink-0">
              <Link to="/contact" className="btn-accent w-full md:w-auto text-lg">
                Request a Quote
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
 