import  { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Partnerships from './pages/Partnerships';
import Locations from './pages/Locations';
import Resources from './pages/Resources';
import ColorsFinishes from './pages/ColorsFinishes';
import ResourceMaterials from './pages/ResourceMaterials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="partnerships" element={<Partnerships />} />
        <Route path="locations" element={<Locations />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/colors-finishes" element={<ColorsFinishes />} />
        <Route path="resources/materials" element={<ResourceMaterials />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
 