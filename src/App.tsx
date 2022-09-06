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
import Registration from "./pages/Registration";
import { useAppDispatch } from "./hooks";
import { useGetUserByTokenQuery } from "./store/services/user";
import { setUser } from "./store/slices/userSlice";
import { useGetCartsQuery } from "./store/services/cart";
import FinishedPresets from "./pages/FinishedPresets/FinishedPresets";

const App = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserByTokenQuery();
  const { data: cart } = useGetCartsQuery();

  React.useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Basket />} />
        <Route path="/presets" element={<FinishedPresets />} />
        <Route path="/my-presets" element={<MyPresets />} />
        <Route path="/my-presets/create" element={<MyPresetsCreate />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
