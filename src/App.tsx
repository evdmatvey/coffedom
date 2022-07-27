import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Promo from './pages/Promo';
import Registaration from './pages/Registration';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/reg" element={<Registaration />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
