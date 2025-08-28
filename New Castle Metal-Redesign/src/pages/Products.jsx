import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import standingseam from "../assets/images/standingseam.jpg";
import roofingfab from "../assets/images/perimeter-roofing.jpg";
import metaledge from "../assets/images/metal-edging roofing.jpg";
import wallpanel from "../assets/images/wall-panels.jpg";

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const productCategories = [
    {
      id: 1,
      title: "Standing Seam Panel Fabrication",
      description: "Our standing seam metal roofing panels offer superior weather resistance, longevity, and aesthetic appeal for commercial, residential, and industrial applications. Available in multiple profiles and finishes, our panels can be fabricated on-site for continuous lengths without splices.",
      image: standingseam,
      features: [
        "Continuous panels without splices",
        "Multiple profile options",
        "On-site fabrication capability",
        "30+ color options",
        "ASTM-tested performance"
      ]
    },
    {
      id: 2,
      title: "Roofing Perimeter Metal Fabrication",
      description: "Our perimeter metal systems are designed to provide secure, watertight terminations for various roofing systems. Our products meet or exceed ANSI/SPRI ES-1 standards and are compatible with all major membrane manufacturers' warranty requirements.",
      image: roofingfab,
      features: [
        "ANSI/SPRI ES-1 certified",
        "Compatible with all major membrane systems",
        "Custom fabrication to project specifications",
        "Available with manufacturer warranty integration",
        "Wide range of finishes and colors"
      ]
    },
    {
      id: 3,
      title: "Perimeter Metal & Edging Fabrication",
      description: "Our edge metal systems include fascia, coping, gutters, and other perimeter components designed for performance and aesthetic appeal. Custom fabricated to your exact specifications, our edge metal products provide reliable protection for your building envelope.",
      image: metaledge,
      features: [
        "Custom fabricated fascia systems",
        "Architectural coping",
        "Integrated gutter systems",
        "Termination bars and flashing",
        "Roof edge security systems"
      ]
    },
    {
      id: 4,
      title: "Wall Panel Series",
      description: "Our metal wall panel systems provide durable, attractive solutions for exterior and interior applications. Available in multiple profiles and finishes, our wall panels offer design flexibility and weather resistance for both new construction and renovation projects.",
      image: wallpanel,
      features: [
        "Multiple profile options",
        "Horizontal and vertical installation",
        "Concealed fastener systems",
        "Weather-resistant barriers",
        "Design flexibility"
      ]
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-gray-200 mb-6">
              Comprehensive metal roofing and wall panel solutions for commercial, residential, and industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="space-y-24" ref={ref}>
            {productCategories.map((product, index) => (
              <div key={product.id} className="product-item">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-dense' : ''}`}>
                  <AnimatedSection animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="rounded-lg shadow-xl overflow-hidden"
                    >
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-80 object-cover"
                      />
                    </motion.div>
                  </AnimatedSection>

                  <AnimatedSection animation={index % 2 !== 0 ? "slideInLeft" : "slideInRight"}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col justify-center"
                    >
                      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                      <p className="text-gray-600 mb-6">{product.description}</p>
                      
                      <h3 className="text-xl font-bold mb-4">Key Features</h3>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                          >
                            <Check size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link to="/contact" className="btn-primary inline-flex">
                          Request Information <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </AnimatedSection>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Call-Out */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
              <p className="text-gray-600 mb-6">
                All New Castle Metal products are manufactured to meet or exceed industry standards and building code requirements. Our technical team can assist you with detailed specifications and performance data for any of our product lines.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Testing &amp; Certifications</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• ASTM E1592 (Wind Uplift)</li>
                    <li>• ASTM E2140 (Water Penetration)</li>
                    <li>• ANSI/SPRI ES-1</li>
                    <li>• UL 580 Class 90 Ratings</li>
                    <li>• Miami-Dade County Approved</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Material Options</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Galvanized Steel (24ga - 16ga)</li>
                    <li>• Aluminum (.032" - .063")</li>
                    <li>• Zinc (.7mm - 1.5mm)</li>
                    <li>• Copper (16oz - 20oz)</li>
                    <li>• Stainless Steel (26ga - 16ga)</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Finish Options</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Kynar 500®/Hylar 5000®</li>
                    <li>• Metallic Finishes</li>
                    <li>• Weathered Finishes</li>
                    <li>• Mill Finished</li>
                    <li>• Custom Colors Available</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/contact" className="btn-accent">
                  Request Technical Data
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 md:max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-200">
                  Contact us today to discuss your metal roofing or wall panel project. Our team of experts will help you select the right products for your specific requirements.
                </p>
              </div>
              <div className="md:flex-shrink-0 flex flex-col space-y-4">
                <Link to="/contact" className="btn-accent whitespace-nowrap">
                  Request a Quote
                </Link>
                <Link to="/resources/colors-finishes" className="btn border-white text-white bg-transparent hover:bg-white hover:text-primary whitespace-nowrap">
                  Explore Color Options
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Products;
 