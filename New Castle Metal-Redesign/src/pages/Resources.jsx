import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Palette, Download, BookOpen, Info } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Colors & Finishes",
      description: "Explore our wide range of metal roof colors and finishes options to find the perfect match for your project.",
      icon: <Palette size={24} className="text-accent" />,
      link: "/resources/colors-finishes",
      image: "https://images.unsplash.com/photo-1606978297876-ca1d2a75e631?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHJvb2ZpbmclMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBibHVlJTIwc2t5fGVufDB8fHx8MTc0MzQzODgwMXww&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920"
    },
    {
      title: "Technical Documents",
      description: "Access detailed product specifications, installation guides, and technical datasheets.",
      icon: <FileText size={24} className="text-accent" />,
      link: "/resources/materials",
      image: "https://images.unsplash.com/photo-1579267217516-b73084bd79a6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZXRhbCUyMHJvb2ZpbmclMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBibHVlJTIwc2t5fGVufDB8fHx8MTc0MzQzODgwMXww&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920"
    },
    {
      title: "Design Resources",
      description: "Download CAD details, BIM objects, and other design resources for your metal roofing projects.",
      icon: <Download size={24} className="text-accent" />,
      link: "/resources/materials",
      image: "https://images.unsplash.com/photo-1606942040878-9a852c5045a3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMHJvb2ZpbmclMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBibHVlJTIwc2t5fGVufDB8fHx8MTc0MzQzODgwMXww&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920"
    },
    {
      title: "Industry Resources",
      description: "Stay informed with the latest industry standards, building codes, and certification information.",
      icon: <BookOpen size={24} className="text-accent" />,
      link: "/resources/materials",
      image: "https://images.unsplash.com/photo-1654331045702-405756aba4ab?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZXRhbCUyMHJvb2ZpbmclMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmUlMjBibHVlJTIwc2t5fGVufDB8fHx8MTc0MzQzODgwMXww&ixlib=rb-4.0.3&fit=fillmax&h=1080&w=1920"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-gray-200 mb-6">
              Access technical information, design resources, and educational materials to support your metal roofing projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse Resources</h2>
              <p className="text-gray-600">
                Explore our comprehensive collection of resources designed to support architects, contractors, and property owners throughout their metal roofing projects.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <AnimatedSection key={category.title} delay={index * 0.1}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg duration-300 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="mr-3">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{category.description}</p>
                    <Link 
                      to={category.link} 
                      className="text-accent font-medium flex items-center hover:underline self-start mt-auto"
                    >
                      View Resources <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
              <p className="text-gray-600">
                Popular and recently updated resources to help with your projects.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Metal Roofing Installation Guide",
                type: "PDF",
                description: "Comprehensive guide for proper installation of standing seam metal roofing systems.",
                icon: <FileText size={20} className="text-accent" />
              },
              {
                title: "Metal Roof Color Chart",
                type: "PDF",
                description: "Complete color chart showing all standard and premium finish options.",
                icon: <Palette size={20} className="text-accent" />
              },
              {
                title: "Metal Roof Care & Maintenance",
                type: "PDF",
                description: "Guidelines for maintaining your metal roof for optimal performance and longevity.",
                icon: <Info size={20} className="text-accent" />
              }
            ].map((resource, index) => (
              <AnimatedSection key={resource.title} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {resource.icon}
                    </div>
                    <h3 className="text-lg font-bold">{resource.title}</h3>
                  </div>
                  <div className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700 self-start mb-4">
                    {resource.type}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{resource.description}</p>
                  <button className="text-accent font-medium flex items-center hover:underline self-start">
                    Download <Download size={14} className="ml-1" />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Request Information */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Need Additional Resources?</h2>
                <p className="text-gray-200 mb-0">
                  Our team is ready to provide you with any additional technical information or resources needed for your specific project requirements.
                </p>
              </div>
              <div>
                <Link to="/contact" className="btn-accent whitespace-nowrap">
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Resources;
 