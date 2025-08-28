import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight } from 'lucide-react';
import drexel from "../assets/images/Drexel-Metals.jpg";
import pacclad from "../assets/images/Pacclad.jpg";
import gaf from "../assets/images/GAF.png";
import jm from "../assets/images/JM.png";
import sca from "../assets/images/SCA.jpg";
import unaclad from "../assets/images/UNA_CLAD.jpg";
import versico from "../assets/images/Versico.png";
import vm from "../assets/images/vmzinc.jpg";
import nycha from "../assets/images/NYCHA.png";

const Partnerships = () => {
  const partnerships = [
    {
      name: "Drexel Metals",
      category: "Standing Seam & Edge Metal",
      description: "New Castle Metal operates as a proud member of Drexel's DM-ARM program. As part of the association of regional manufacturers, New Castle Metal offers on-site and factory formed panels with the approval of Drexel Metal.",
      logo: {drexel},
      type: ["standing-seam", "edge-metal"]
    },
    {
      name: "Petersen Aluminum (Pac-Clad)",
      category: "Standing Seam",
      description: "New Castle Metal is part of Petersen's PACCA program. This stringent program ensures New Castle Metal products pass third party inspection and meet the requirements of Petersen's strict manufacturing protocols. This Quality Assurance certification enables New Castle Metal to supply Pac-Clad panels in the regional market, whether site formed or factory formed.",
      logo: {pacclad},
      type: ["standing-seam"]
    },
    {
      name: "Elevate (Una-Clad)",
      category: "Standing Seam",
      description: "New Castle Metal is a Red-Shield approved manufacturer of Elevate's Una-Clad metal roofing line. As a licensed manufacturer of their roll-formed panel systems, New Castle Metal is able to provide Elevate's metal roofing panels without out-of-state freight fees, and with local service.",
      logo: {unaclad},
      type: ["standing-seam"]
    },
    {
      name: "VM Building Solutions",
      category: "Standing Seam",
      description: "VM Building Solutions is a world leader in the production of zinc for the building industry, in terms of volume and in technical expertise. Under the VMZINC brand name, VM Building Solutions manufactures all-in-one zinc solutions for the building industry, from roofing, façade and rainwater systems to accessories and high-quality decoration.",
      logo: {vm},
      type: ["standing-seam"]
    },
    {
      name: "Versico",
      category: "Edge Metal",
      description: "New Castle Metal is authorized to provide edge metal accepted into Versico's Edge-to-Edge warranty for up to 20 years and 80-mph wind speed coverage.",
      logo: {versico},
      type: ["edge-metal"]
    },
    {
      name: "GAF",
      category: "Industry Relationship",
      description: "Many of New Castle Metals ANSI/SPRI ES-1 certified components are able to be integrated with GAF low-slope membrane systems without compromising the warrantability of the project. Please contact your New Castle Metal representative or reach out via the request a quote tab for more information.",
      logo: {gaf},  
      type: ["industry"]
    },
    {
      name: "Johns Manville",
      category: "Industry Relationship",
      description: "Many of New Castle Metals ANSI/SPRI ES-1 certified components are able to be integrated with JM low-slope membrane systems without compromising the warrantability of the project. New Castle Metal systems have been approved for warranties up to 20 years and 80-mph. Please contact your New Castle Metal representative or reach out via the request a quote tab for more information.",
      logo: {jm},
      type: ["industry"]
    },
    {
      name: "School Construction Authority",
      category: "Industry Relationship",
      description: "New Castle Metal is proud to be an approved manufacturer of perimeter, edge, and masonry flashings for the School Construction Authority. Our various profiles are approved for installation on any SCA project. Please contact your New Castle Metal representative or reach out via the request a quote tab for more information.",
      logo: {sca},
      type: ["industry"]
    },
    {
      name: "New York City Housing Authority",
      category: "Industry Relationship",
      description: "New Castle Metal is proud to be an approved manufacturer of perimeter, edge, and masonry flashings for the New York City Housing Authority. Our various profiles are approved for installation on any NYCHA project. Please contact your New Castle Metal representative or reach out via the request a quote tab for more information.",
      logo: {nycha},
      type: ["industry"]
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPartnerships = activeFilter === 'all' 
    ? partnerships 
    : partnerships.filter(p => p.type.includes(activeFilter));

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary text-white overflow-hidden">
        <motion.div 
          style={{
            position: 'absolute',
            inset: '0',
            zIndex: 0,
            backgroundColor: 'var(--primary)',
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(52, 152, 219, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(41, 128, 185, 0.3) 0%, transparent 50%)',
            backgroundSize: '150% 150%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div 
            {...{ className: "max-w-3xl" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partnerships</h1>
            <p className="text-xl text-gray-200 mb-6">
              New Castle Metal is the "go-to" manufacturer in the Northeast for a number of the nation's largest standing seam and membrane manufacturers. Our partnerships ensure superior quality and industry-leading support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Strategic Partnerships</h2>
              <p className="text-gray-600 mb-8">
                Our commitment to supplying quality products, and ability to solve any problem with creative solutions, industry-leading machinery, and superior customer service has made us a valuable resource for manufacturer's.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { value: 'all', label: 'All Partnerships' },
                  { value: 'standing-seam', label: 'Standing Seam' },
                  { value: 'edge-metal', label: 'Edge Metal' },
                  { value: 'industry', label: 'Industry Relationships' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeFilter === filter.value
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPartnerships.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  {...{ className: "bg-white p-6 rounded-lg shadow-md h-full flex flex-col" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                      <img 
                        src='{partner.logo}'
                        alt={`${partner.name} logo`} 
                        className="w-24 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{partner.name}</h3>
                      <span className="text-sm text-gray-500">{partner.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{partner.description}</p>
                  <div>
                    <Link to="/contact" className="text-accent font-medium flex items-center hover:underline">
                      Request Info <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Information About Our Partnerships?</h2>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Our team is ready to help you understand how our manufacturer partnerships can benefit your project. Contact us for details on warranty coverage, product specifications, and more.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Our Team
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Partnerships;
 