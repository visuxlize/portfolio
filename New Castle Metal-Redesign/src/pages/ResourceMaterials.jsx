import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const ResourceMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock resource data
  const resources = [
    {
      id: 1,
      title: "Standing Seam Installation Guide",
      type: "PDF",
      category: "installation",
      description: "Comprehensive guide for proper installation of standing seam metal roofing systems.",
      fileSize: "2.4 MB",
      date: "2023-04-15"
    },
    {
      id: 2,
      title: "Metal Roof Edge Detail Drawings",
      type: "DWG",
      category: "cad",
      description: "CAD drawings of standard metal roof edge details for architectural design use.",
      fileSize: "5.7 MB",
      date: "2023-02-28"
    },
    {
      id: 3,
      title: "Metal Roof Maintenance Guide",
      type: "PDF",
      category: "maintenance",
      description: "Guidelines for maintaining your metal roof for optimal performance and longevity.",
      fileSize: "1.2 MB",
      date: "2023-06-10"
    },
    {
      id: 4,
      title: "Architectural Specifications - Standing Seam",
      type: "DOC",
      category: "specifications",
      description: "Editable specifications for standing seam metal roofing systems in CSI format.",
      fileSize: "3.1 MB",
      date: "2023-03-05"
    },
    {
      id: 5,
      title: "Snow Retention System Details",
      type: "PDF",
      category: "technical",
      description: "Technical details and load calculations for snow retention systems on metal roofs.",
      fileSize: "4.5 MB",
      date: "2023-01-18"
    },
    {
      id: 6,
      title: "Metal Roof Color Chart",
      type: "PDF",
      category: "colors",
      description: "Complete color chart showing all standard and premium finish options.",
      fileSize: "8.2 MB",
      date: "2023-05-22"
    },
    {
      id: 7,
      title: "Metal Roof BIM Objects",
      type: "RVT",
      category: "bim",
      description: "Revit files for metal roofing systems integration with BIM workflows.",
      fileSize: "12.4 MB",
      date: "2023-04-30"
    },
    {
      id: 8,
      title: "LEED Documentation Guide",
      type: "PDF",
      category: "sustainability",
      description: "Guide for using metal roofing products to achieve LEED points in green building projects.",
      fileSize: "2.8 MB",
      date: "2023-07-12"
    },
    {
      id: 9,
      title: "Metal Roof Warranty Information",
      type: "PDF",
      category: "warranty",
      description: "Detailed information about standard and extended warranty options for metal roofing systems.",
      fileSize: "1.5 MB",
      date: "2023-03-15"
    }
  ];

  // Filter resources based on search term and category
  const filteredResources = resources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resource => 
      selectedCategory === "all" || resource.category === selectedCategory
    );

  // Get unique categories
  const categories = ["all", ...new Set(resources.map(resource => resource.category))];

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
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Technical Resources</h1>
              <p className="text-xl text-gray-200 mb-6">
                Download technical documents, specifications, and design resources for your metal roofing projects.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/resources" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                  <ArrowLeft size={16} className="mr-2" /> Back to Resources
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="w-full md:w-auto flex items-center">
              <Filter size={18} className="mr-2 text-gray-500" />
              <span className="text-sm text-gray-700 mr-3">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Available Resources</h2>
              <p className="text-gray-600">
                {filteredResources.length} resources found. Click on any resource to download.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <AnimatedSection key={resource.id} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <FileText size={20} className="text-accent mr-3 flex-shrink-0" />
                        <h3 className="text-lg font-bold">{resource.title}</h3>
                      </div>
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{resource.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Size: {resource.fileSize}</span>
                      <span>Updated: {new Date(resource.date).toLocaleDateString()}</span>
                    </div>
                    <button className="text-accent font-medium flex items-center hover:underline self-start mt-auto">
                      Download <Download size={14} className="ml-1" />
                    </button>
                  </motion.div>
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold mb-2">No Resources Found</h3>
                <p className="text-gray-500 mb-4">No resources match your current search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-accent hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Request Custom Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8 md:flex-1">
                  <h2 className="text-2xl font-bold mb-4">Need a Specific Resource?</h2>
                  <p className="text-gray-600 mb-0">
                    Can't find what you're looking for? Our team can provide you with custom technical information or resources tailored to your specific project requirements.
                  </p>
                </div>
                <div className="md:flex-shrink-0">
                  <Link to="/contact" className="btn-primary whitespace-nowrap">
                    Request Resources
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

const ArrowLeft = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
};

export default ResourceMaterials;
 