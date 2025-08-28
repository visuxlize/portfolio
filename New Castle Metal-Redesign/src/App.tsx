import  { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Partnerships from './pages/Partnerships';
import ColorsFinishes from './pages/ColorsFinishes';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="locations" element={<Locations />} />
        <Route path="contact" element={<Contact />} />
        <Route path="partnerships" element={<Partnerships />} />
        <Route path="colors-finishes" element={<ColorsFinishes />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
 