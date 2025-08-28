import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Settings, Home, Wrench, Layers, Database, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import services from '../data/services';
import AnimatedSection from '../components/AnimatedSection';

const Services = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Settings': return <Settings className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Database': return <Database className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      default: return <Settings className="w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
          <img 
            src="https://images.unsplash.com/photo-1531053326607-9d349096d887?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwaW5kdXN0cmlhbCUyMHdlbGRpbmd8ZW58MHx8fHwxNzQzMjg0NDk5fDA&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200"
            alt="Metal welding close-up"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
          </motion.div>
        </div>
        
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-gray-200 mb-6">
                Comprehensive metal fabrication, installation, and maintenance solutions tailored to your specific requirements.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-wrap mb-8 border-b overflow-x-auto">
              {services.map((service: { id: number; icon: string; title: string }) => (
                  <motion.button
                  key={service.id}
                  data-id={`service-${service.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center px-4 py-3 font-medium transition-colors focus:outline-none whitespace-nowrap mb-2 mr-2 md:mb-0 
                    ${activeTab === service.id
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-600 hover:text-accent'
                    }`}
                >
                  {getIconComponent(service.icon)}
                  <span className="ml-2">{service.title}</span>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {services.map((service) => (
              activeTab === service.id && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <AnimatedSection animation="slideInLeft">
                      <h2 className="text-3xl font-bold mb-6">{service.title}</h2>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <h3 className="text-xl font-bold mb-4">Our Approach</h3>
                      <ul className="space-y-3 mb-6">
                        <ServiceFeature text="Personalized consultation to understand your specific needs" />
                        <ServiceFeature text="Custom designs and solutions tailored to your requirements" />
                        <ServiceFeature text="Expert fabrication using premium materials and advanced techniques" />
                        <ServiceFeature text="Thorough quality control throughout the process" />
                        <ServiceFeature text="Professional installation and follow-up support" />
                      </ul>
                    </AnimatedSection>

                    <AnimatedSection animation="slideInRight">
                      <div className="rounded-lg shadow-xl overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full"
                          />
                        </motion.div>
                      </div>
                    </AnimatedSection>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50" ref={ref}>
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-gray-600">
                We follow a comprehensive, client-centered approach to ensure your project is completed to the highest standards.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Consultation", description: "We begin with a detailed consultation to understand your requirements, objectives, and specifications." },
              { number: "02", title: "Design & Planning", description: "Our team creates detailed designs and develops a comprehensive project plan with timelines and milestones." },
              { number: "03", title: "Fabrication", description: "Using state-of-the-art equipment and techniques, we fabricate your metal components with precision and care." },
              { number: "04", title: "Installation & Support", description: "We provide professional installation and ongoing support to ensure your complete satisfaction." }
            ].map((item, i) => (
              <motion.div
                key={i}
                style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s', ':hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' } }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-accent mb-4">{item.number}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-white text-opacity-90 text-lg mb-0">
                  Contact us today to discuss your specific needs and discover how our services can benefit your project.
                </p>
              </div>
              <div className="md:flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn bg-white text-accent hover:bg-gray-100">
                    Contact Our Team
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

const ServiceFeature = ({ text }: { text: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.li 
      ref={ref}
      {...{ className: "flex items-start" }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Check size={20} className="mr-3 text-accent flex-shrink-0 mt-1" />
      <span className="text-gray-600">{text}</span>
    </motion.li>
  );
};

export default Services;
 