import { Route, Routes } from "react-router-dom";

import Cart from "../../../PAGES/cart/cart.jsx";

const BackgroundRoutes = () => {
  return (
    <Routes>
      <Route path="/:tab?/cart" element={<Cart />} />
    </Routes>
  );
};

export default BackgroundRoutes;
