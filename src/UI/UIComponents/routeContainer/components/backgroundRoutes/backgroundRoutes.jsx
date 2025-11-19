import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import useData from "@hooks/useData.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

const Preview = lazy(() => import("../../../PAGES/preview/preview.jsx"));
const Cart = lazy(() => import("../../../PAGES/cart/cart.jsx"));

const PreviewRoute = () => {
  const { category, id } = useGetParams();

  const { data, isLoading } = useData("gallery");

  if (!data) return;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const uniqueViewEmbedded = foundObj?._embedded,
    { amount, colors, height, width } = uniqueViewEmbedded.details,
    productProps = {
      all: uniqueViewEmbedded,

      displayedDetails: {
        title: uniqueViewEmbedded?.setTitle,
        price: uniqueViewEmbedded?.details.price,
        type: uniqueViewEmbedded?.details.type,
        quickViewImages: foundObj.images.map((img) => img.src),
      },

      infoDetails: { amount, colors, height, width },
    };

  return (
    <Preview productProps={productProps} isLoading={isLoading} obj={foundObj} />
  );
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
