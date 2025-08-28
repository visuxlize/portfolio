import  { ArrowRight, Calendar, Award, Users, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import storyimage from "../assets/images/Truck-Debut-181.jpg";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const coreValues = [
    {
      title: "Caring",
      description: "We care about our employees, customers and vendors. We value the skills, strengths and perspectives of our employees. We strive to satisfy and delight our customers. We cultivate solid relationships and partnerships with our vendors."
    },
    {
      title: "Urgency",
      description: "We respond to every need with a sense of urgency and are responsive in our communication and promptly follow through to deliver on our commitment."
    },
    {
      title: "Teamwork",
      description: "We promote a collaborative workplace and a seamless organization driven by teamwork. Our people, our products, and our assets are shared across all locations in order to function as one company."
    },
    {
      title: "Honesty",
      description: "We adopt an open and honest communication amongst our employees, customers, and vendors. We tell people the truth, it's the only option."
    },
    {
      title: "Accountability",
      description: "We accept responsibility and take personal accountability for our actions. We lead by example and take ownership for our decisions, actions and performance whether good or bad."
    },
    {
      title: "Flexibility",
      description: "We are a flexible company that adapts to changing situations by readjusting our priorities in order to get things done."
    },
    {
      title: "Passionate",
      description: "We are knowledgeable of our business, engaged in our people and passionate about everything we do, resulting in a superior service that fulfills real needs and provides a lasting value."
    }
  ];

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
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(52, 152, 219, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(41, 128, 185, 0.3) 0%, transparent 50%)',
            backgroundSize: '150% 150%'
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About New Castle Metal</h1>
            <p className="text-xl text-gray-200 mb-6">
              The Northeast's premier metal roofing supplier with custom design capabilities and local manufacturing capacity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideInLeft">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                With our custom design capabilities and local manufacturing capacity, New Castle Metal is the Northeast's premier metal roofing supplier. A subsidiary of New Castle Building Products, New Castle Metal was established in 2016 to provide our customers with a full range of metal roofing offerings and services.
              </p>
              <p className="text-gray-600 mb-4">
                The synergy between New Castle Metal and New Castle Building Products helps to shorten lead times for our customers with fast estimates, local manufacturing and on-site fabrication. Our dedicated teams provide turnkey, superior solutions for standing seam roofing and metal roof edge & trim systems to commercial, industrial and residential projects.
              </p>
              <p className="text-gray-600">
                With seven convenient locations, we're able to service New York, New Jersey, Connecticut, Rhode Island, Massachusetts, Vermont, New Hampshire, Maine, Delaware, Eastern Pennsylvania, and south to Baltimore, Maryland.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg shadow-xl overflow-hidden"
              >
                <img 
                  src={storyimage}
                  alt="Metal roofing installation on a commercial building" 
                  className="w-full"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 text-lg text-center mb-6">
                New Castle Metal is dedicated in its mission to build relationships among professional contractors, commercial and residential property owners, manufacturers and distributors. Together, we can create a professional, informative and friendly marketplace for supplying building materials for projects of all sizes.
              </p>
              <p className="text-gray-600 text-lg text-center">
                Caring about our employees, customers and vendors; and maintaining the highest standards of service, safety and professionalism will lead to growth and prosperity for NCBP and all of our partners in business.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Values</h2>
              <p className="text-gray-600">
                Our values guide everything we do and define who we are as a company.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-gray-200">
                Delivering exceptional metal roofing solutions throughout the Northeast.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Calendar className="h-10 w-10 text-accent" />, stat: "7+", label: "Years of Experience" },
              { icon: <Users className="h-10 w-10 text-accent" />, stat: "100+", label: "Skilled Professionals" },
              { icon: <Globe className="h-10 w-10 text-accent" />, stat: "7", label: "Strategic Locations" },
              { icon: <Award className="h-10 w-10 text-accent" />, stat: "1,000+", label: "Projects Completed" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <motion.h3 
                  className="text-4xl font-bold mb-2 text-primary"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                >
                  {item.stat}
                </motion.h3>
                <p className="text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Contact us today to discuss your metal roofing needs or visit one of our locations to see our capabilities firsthand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn-accent">
                Contact Us
              </Link>
              <Link to="/locations" className="btn-outline">
                Find Locations <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default About;
 