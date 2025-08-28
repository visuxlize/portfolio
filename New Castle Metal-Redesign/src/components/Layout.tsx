import  { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        layout
        style={{ flexGrow: 1 }}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Layout;
 