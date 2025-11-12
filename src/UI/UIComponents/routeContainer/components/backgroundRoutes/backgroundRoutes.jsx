import { Route, Routes, useLocation } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

import QuickViewImage from "../../../PAGES/preview/preview.jsx";
import Cart from "../../../PAGES/cart/cart.jsx";

const PreviewRoute = ({ backgroundLocation }) => {
  const { data, isLoading } = useData(backgroundLocation);

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

  return <QuickViewImage productProps={productProps} isLoading={isLoading} />;
};

const BackgroundRoutes = () => {
  const location = useLocation(),
    backgroundLocation =
      location.state?.backgroundLocation.replace("/", "") || "home";

  return (
    <Routes>
      <Route
        path="/:tab?/preview/:category?/:id?/*"
        element={<PreviewRoute backgroundLocation={backgroundLocation} />}
      />
      <Route path="/:tab?/cart" element={<Cart />} />
    </Routes>
  );
};

export default BackgroundRoutes;
