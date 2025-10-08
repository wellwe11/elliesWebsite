import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage.jsx";
import Cart from "../../../BODY/cart/cart.jsx";

const PreviewRoute = ({ backgroundLocation }) => {
  const { data, isLoading } = useData(backgroundLocation);

  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("id") || null;

  if (isLoading) return null;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const uniqueViewEmbedded = foundObj?._embedded,
    quickViewProps = {
      quickViewImages: uniqueViewEmbedded?.restImages,
      title: uniqueViewEmbedded?.setTitle,
      price: uniqueViewEmbedded?.details.price,
      bio: uniqueViewEmbedded?.setDescription,
    };

  return (
    <QuickViewImage quickViewProps={quickViewProps} isLoading={isLoading} />
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
