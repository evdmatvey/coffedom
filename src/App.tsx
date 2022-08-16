import React from "react";
import { Route, Routes } from "react-router-dom";
import Basket from "./pages/Basket";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPresets from "./pages/MyPresets";
import MyPresetsCreate from "./pages/MyPresetsCreate";
import Promo from "./pages/Promo";
import Registaration from "./pages/Registration";

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
        <Route path="/login" element={<Login />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/my-presets" element={<MyPresets />} />
        <Route path="/my-presets/create" element={<MyPresetsCreate />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
