import { Route, Routes, useLocation } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage.jsx";
import Cart from "../../../PAGES/cart/cart.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

const PreviewRoute = ({ backgroundLocation }) => {
  const { data, isLoading } = useData(backgroundLocation);

  const { category, id } = useGetParams();

  if (!data) return null;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const uniqueViewEmbedded = foundObj?._embedded,
    productProps = {
      quickViewImages: foundObj.images.map((img) => img.src),
      title: uniqueViewEmbedded?.setTitle,
      price: uniqueViewEmbedded?.details.price,
      bio: uniqueViewEmbedded?.setDescription,
      all: uniqueViewEmbedded,
    };

  const {
      details: { amount, colors, height, width },
    } = uniqueViewEmbedded,
    infoDetails = { amount, colors, height, width };

  return (
    <QuickViewImage
      productProps={productProps}
      isLoading={isLoading}
      infoDetails={infoDetails}
    />
  );
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
