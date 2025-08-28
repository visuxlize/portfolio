import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Check } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useState } from 'react';

// Sample colors from a metal roofing color chart
const colorPalette = [
  // Standard Colors
  { id: 1, name: 'Bone White', hex: '#F5F2E8', category: 'standard' },
  { id: 2, name: 'Sandstone', hex: '#DBCEBE', category: 'standard' },
  { id: 3, name: 'Sierra Tan', hex: '#B7A58C', category: 'standard' },
  { id: 4, name: 'Almond', hex: '#D9C7A7', category: 'standard' },
  { id: 5, name: 'Charcoal Gray', hex: '#363636', category: 'standard' },
  { id: 6, name: 'Slate Gray', hex: '#556067', category: 'standard' },
  { id: 7, name: 'Matte Black', hex: '#202020', category: 'standard' },
  { id: 8, name: 'Cityscape', hex: '#9A9A9A', category: 'standard' },
  { id: 9, name: 'Classic Green', hex: '#32543B', category: 'standard' },
  { id: 10, name: 'Hartford Green', hex: '#1E3B2C', category: 'standard' },
  { id: 11, name: 'Forest Green', hex: '#1B3426', category: 'standard' },
  { id: 12, name: 'Dark Bronze', hex: '#382E29', category: 'standard' },
  { id: 13, name: 'Medium Bronze', hex: '#604D45', category: 'standard' },
  { id: 14, name: 'Colonial Red', hex: '#6E2124', category: 'standard' },
  { id: 15, name: 'Terra Cotta', hex: '#A14A35', category: 'standard' },
  
  // Premium Colors
  { id: 16, name: 'Champagne Metallic', hex: '#DECDB3', category: 'premium' },
  { id: 17, name: 'Copper Penny', hex: '#B06D4F', category: 'premium' },
  { id: 18, name: 'Silversmith', hex: '#C1C2C2', category: 'premium' },
  { id: 19, name: 'Zinc Gray', hex: '#888B8C', category: 'premium' },
  { id: 20, name: 'Patina Green', hex: '#648C82', category: 'premium' },
  { id: 21, name: 'Weathered Zinc', hex: '#8B8F8F', category: 'premium' },
  { id: 22, name: 'Weathered Copper', hex: '#777B69', category: 'premium' },
  
  // Cool Roof Colors
  { id: 23, name: 'Regal White', hex: '#F6F6F6', category: 'cool', coolRoof: true },
  { id: 24, name: 'Cool Almond', hex: '#E0CEB0', category: 'cool', coolRoof: true },
  { id: 25, name: 'Cool Sandstone', hex: '#E2D5C5', category: 'cool', coolRoof: true },
  { id: 26, name: 'Light Stone', hex: '#D4CDB9', category: 'cool', coolRoof: true },
  { id: 27, name: 'Cool Slate Gray', hex: '#60696F', category: 'cool', coolRoof: true },
  { id: 28, name: 'Silver', hex: '#C3C6C9', category: 'cool', coolRoof: true },
];

const ColorsFinishes = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredColors = activeFilter === 'all'
    ? colorPalette
    : colorPalette.filter(color => color.category === activeFilter || (activeFilter === 'cool' && color.coolRoof));

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Metal Roof Colors & Finishes</h1>
            <p className="text-xl text-gray-200 mb-6">
              Explore our extensive selection of high-quality colors and finishes for your metal roofing project.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/resources" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                <ArrowLeft size={16} className="mr-2" /> Back to Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                New Castle Metal's high-performance metal roofs are available in 30 standard paint colors from Sherwin Williams. Additional finish options include metallic copper, low gloss bronze and earth tones, and anodized finishes in bronze and zinc. Choose from our extensive selection of roof colors to match a historic color palette, or increase commercial visibility with a bright red, green or blue roof.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                For energy savings, select a color with Cool Metal Roofing certification. Cool Metal Roofing is finished with high-quality, oven-cured coating systems that resist fading, mildew and soil. These roofing products meet the reflectance requirements of all major energy codes, helping contractors meet local sustainability requirements. Cool Metal Roofing typically contains at least 25% recycled content; plus, it's 100% recyclable and has a lifecycle of up to 30 years. Specify a Cool Metal Roof to reduce your energy costs and help your building qualify for points under the LEED Green Building Rating System.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Color Filters */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { value: 'all', label: 'All Colors' },
                { value: 'standard', label: 'Standard Colors' },
                { value: 'premium', label: 'Premium Colors' },
                { value: 'cool', label: 'Cool Roof Colors' }
              ].map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === filter.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Color Palette Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredColors.map((color, index) => (
              <AnimatedSection key={color.id} delay={index * 0.03}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div 
                    className="h-32 w-full" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{color.name}</h3>
                    <p className="text-sm text-gray-500">{color.hex}</p>
                    {color.coolRoof && (
                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <Check size={12} className="mr-1" />
                        <span>Cool Roof Certified</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cool Roof Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="mr-4 mt-1 text-accent">
                  <Info size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Benefits of Cool Metal Roofing</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Reduces energy costs by reflecting solar heat</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Contains at least 25% recycled content</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">100% recyclable at end of life</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Lifecycle of up to 30 years</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Helps buildings qualify for LEED Green Building Rating System points</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">Reduces urban heat island effect</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6">Ready to Select a Color?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Contact us today to request color samples or speak with a New Castle Metal representative about your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn-accent">
                Request Color Samples
              </Link>
              <Link to="/projects" className="btn-outline">
                View Our Projects <ArrowRight size={16} className="ml-2" />
              </Link>
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

export default ColorsFinishes;
 