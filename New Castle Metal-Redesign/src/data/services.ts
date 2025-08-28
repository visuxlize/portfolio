import  { ServiceType } from '../types';
import standingseam from "../assets/images/standingseam.jpg";
import roofingfab from "../assets/images/perimeter-roofing.jpg";
import metaledge from "../assets/images/metal-edging roofing.jpg";
import wallpanel from "../assets/images/wall-panels.jpg";
import rollforming from "../assets/images/Truck-Debut-181.jpg";

const services: ServiceType[] = [
  {
    id: 1,
    title: "Standing Seam Metal Roofing",
    description: "New Castle Metal provides premium standing seam metal roofing solutions for commercial, industrial and residential projects. Our on-site fabrication capabilities allow us to create custom-length panels with no splices, reducing the risk of leaks and providing a cleaner aesthetic. We offer a variety of profiles, widths, and finishes to meet the specific requirements of your project.",
    icon: "Home",
    image: standingseam,
  },
  {
    id: 2,
    title: "Metal Roof Edge & Trim Systems",
    description: "Our metal roof edge and trim systems are engineered and tested to meet or exceed industry standards, including ANSI/SPRI ES-1 certification. We manufacture custom fascia, coping, gutters, and other perimeter metal components for both new construction and retrofit projects. Our systems are compatible with all major membrane roofing systems and can be integrated into manufacturer warranties.",
    icon: "Settings",
    image: roofingfab,
  },
  {
    id: 3,
    title: "Wall Panel Systems",
    description: "New Castle Metal offers a variety of architectural wall panel systems for exterior and interior applications. Our wall panels provide design flexibility, durability, and energy efficiency for both new construction and renovation projects. Available in multiple profiles, widths, and finishes, our wall panels can be customized to achieve your design vision.",
    icon: "Layers",
    image: wallpanel,
  },
  {
    id: 4,
    title: "On-Site Fabrication",
    description: "Our mobile roll-forming equipment allows us to fabricate standing seam panels directly at your job site, eliminating transportation damage and enabling custom-length panels without splices. This service is particularly valuable for projects with long panel runs or limited access for material delivery and handling.",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1492841036294-881dfc24c2b2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZXRhbCUyMHJvb2ZpbmclMjBzdGFuZGluZyUyMHNlYW0lMjBjb21tZXJjaWFsfGVufDB8fHx8MTc0MzI4NTU2MHww&ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200",
  },
  {
    id: 5,
    title: "Custom Metal Fabrication",
    description: "Beyond standard metal roofing and wall panel systems, New Castle Metal provides custom metal fabrication services to meet your specific project requirements. Our experienced fabricators can create one-of-a-kind architectural elements, decorative features, and specialty components in a wide range of metals and finishes.",
    icon: "FileText",
    image: metaledge,
  },
  {
    id: 6,
    title: "Contractor Partnerships",
    description: "New Castle Metal works closely with qualified contractors to ensure proper installation of our metal roofing and wall panel systems. We provide technical support, training, and resources to help contractors deliver high-quality installations that meet manufacturer specifications and warranty requirements.",
    icon: "Users",
    image: rollforming,
  }
];

export default services;
 