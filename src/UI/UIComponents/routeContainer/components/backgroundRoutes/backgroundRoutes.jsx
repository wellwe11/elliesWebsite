import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import useData from "@hooks/useData.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import useGetParams from "@hooks/useGetParams.jsx";
import dataHandler from "../../functions/dataHandler.js";

const Preview = lazy(() => import("../../../PAGES/preview/preview.jsx"));
const Cart = lazy(() => import("../../../PAGES/cart/cart.jsx"));

const PreviewRoute = () => {
  const { category, id, otherGet } = useGetParams("child");
  const location = useLocation();
  const backgroundLocation = location.backgroundLocation;

  const { data, isLoading } = useData(
    backgroundLocation === "/" ? "home" : "gallery"
  );

  if (!data) return;

  const updatedData = dataHandler(data, category);

  const idToFind = otherGet ? `${id}&child=${otherGet}` : id;

  const foundObj = updatedData.find((a) => a.id === idToFind);

  return <Preview isLoading={isLoading} obj={foundObj} />;
};

const BackgroundRoutes = () => {
  const { location } = useGetLocation();
  const { tempLocation, tempSearch } = location.state || {};

  return (
    <>
      {location.pathname.includes("cart") && (
        <Routes location={location}>
          <Route path="/:tab?/cart" element={<Cart />} />
        </Routes>
      )}

      <Routes location={tempLocation || location}>
        <Route
          path="/:tab?/preview/*"
          element={<PreviewRoute search={tempSearch || location.search} />}
        />
      </Routes>
    </>
  );
};

export default BackgroundRoutes;
