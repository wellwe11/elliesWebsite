import { Route, Routes } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import useGetParams from "@hooks/useGetParams.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";

import Preview from "../../../PAGES/preview/preview.jsx";
import Cart from "../../../PAGES/cart/cart.jsx";

const PreviewRoute = ({
  location,
  backgroundLocation,
  prevBackgroundLocation,
}) => {
  const { data, isLoading } = useData("gallery");

  const { category, id } = useGetParams();

  if (!data) return null;

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
  const { location, backgroundLocation, prevBackgroundLocation } =
    useGetLocation();

  console.log(location, backgroundLocation, prevBackgroundLocation);

  return (
    <>
      <Routes
        location={backgroundLocation || prevBackgroundLocation || location}
      >
        <Route path="/:tab?/cart" element={<Cart />} />
        {/* 
        <Route
          path="/:tab?/preview/:category?/:id?/*"
          element={
            <PreviewRoute
              location={location}
              backgroundLocation={backgroundLocation}
              prevBackgroundLocation={prevBackgroundLocation}
            />
          }
        /> */}
      </Routes>

      <Routes location={prevBackgroundLocation || location}>
        <Route path="/:tab?/cart" element={<Cart />} />

        <Route
          path="/:tab?/preview/:category?/:id?/*"
          element={
            <PreviewRoute
              location={location}
              backgroundLocation={backgroundLocation}
              prevBackgroundLocation={prevBackgroundLocation}
            />
          }
        />
      </Routes>
    </>
  );
};

export default BackgroundRoutes;
