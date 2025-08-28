import  { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import locations from '../data/locations';
import AnimatedSection from '../components/AnimatedSection';

const Contact = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'all',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormValues({
          name: '',
          email: '',
          phone: '',
          location: 'all',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-primary"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'], 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{ 
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(52, 152, 219, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(41, 128, 185, 0.4) 0%, transparent 50%)',
            backgroundSize: '150% 150%'
          }}
        />
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-200 mb-6">
                Get in touch with our team for inquiries, quotes, or to discuss your metal fabrication needs.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <AnimatedSection animation="slideInLeft" className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg h-full">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6 mb-8">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactItem 
                      icon={<Phone size={20} className="text-accent" />}
                      title="Phone"
                      details="Main Office: (914) 948-6363"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactItem 
                      icon={<Mail size={20} className="text-accent" />}
                      title="Email"
                      details="info@newcastlemetal.com"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactItem 
                      icon={<MapPin size={20} className="text-accent" />}
                      title="Headquarters"
                      details="535 Old Tarrytown Rd, White Plains, NY 10603"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactItem 
                      icon={<Clock size={20} className="text-accent" />}
                      title="Business Hours"
                      details="Monday-Friday: 6am-4pm"
                    />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <SocialButton name="Facebook" />
                  <SocialButton name="LinkedIn" />
                  <SocialButton name="Instagram" />
                </div>
              </div>
            </AnimatedSection>
            
            {/* Contact Form */}
            <AnimatedSection animation="slideInRight" className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="mb-4 inline-block"
                    >
                      <CheckCircle size={60} className="text-green-500 mx-auto" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name*</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formValues.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Preferred Location</label>
                        <select
                          id="location"
                          name="location"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          value={selectedLocation}
                          onChange={(e) => {
                            setSelectedLocation(e.target.value);
                            handleInputChange(e);
                          }}
                          disabled={formStatus === 'submitting'}
                        >
                          <option value="all">Any Location</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.id.toString()}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject*</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                        disabled={formStatus === 'submitting'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message*</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formValues.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                        disabled={formStatus === 'submitting'}
                      ></textarea>
                    </div>
                    
                    <div>
                      <motion.button 
                        type="submit" 
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message <Send size={16} className="ml-2" />
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-16 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
              <p className="text-gray-600">
                With five strategic locations throughout the Northeast, we're positioned to serve clients with local expertise and resources.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-md h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin size={40} className="mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
              <p className="text-gray-500">An interactive map showing all New Castle Metal locations would be displayed here.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {locations.slice(0, 3).map((location, index) => (
              <AnimatedSection key={location.id} delay={index * 0.1}>
                <LocationCard location={location} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mt-8">
              <a href="/locations" className="btn-primary">
                View All Locations <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

const ContactItem = ({ icon, title, details }: { icon: React.ReactNode, title: string, details: string }) => (
  <div className="flex items-start">
    <div className="mr-4 mt-1">{icon}</div>
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">{details}</p>
    </div>
  </div>
);

const SocialButton = ({ name }: { name: string }) => (
  <motion.a
    href="#"
    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-accent transition-colors"
    aria-label={name}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.9 }}
  >
    {name === "Facebook" && <div className="w-5 h-5">F</div>}
    {name === "LinkedIn" && <div className="w-5 h-5">L</div>}
    {name === "Instagram" && <div className="w-5 h-5">I</div>}
  </motion.a>
);

const LocationCard = ({ location }: { location: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg duration-300"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
        <motion.a 
          href={`/locations#${location.id}`} 
          className="text-accent font-medium flex items-center hover:underline"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View Details <ArrowRight size={16} className="ml-1" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Contact;
 