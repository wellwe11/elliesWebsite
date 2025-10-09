import { Route, Routes, useLocation } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage.jsx";
import Cart from "../../../BODY/cart/cart.jsx";
import useGetParams from "@hooks/useGetParams.jsx";
import { useLayoutEffect } from "react";

const PreviewRoute = ({ backgroundLocation, setIsLoading, setIsError }) => {
  const { data, isLoading } = useData(backgroundLocation);

  const { category, id } = useGetParams();

  useLayoutEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

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

const BackgroundRoutes = ({ setIsLoading, setIsError }) => {
  const location = useLocation(),
    backgroundLocation =
      location.state?.backgroundLocation.replace("/", "") || "home";

  return (
    <Routes>
      <Route
        path="/:tab?/preview/:category?/:id?/*"
        element={
          <PreviewRoute
            setIsError={setIsError}
            setIsLoading={setIsLoading}
            backgroundLocation={backgroundLocation}
          />
        }
      />
      <Route path="/:tab?/cart" element={<Cart />} />
    </Routes>
  );
};

export default BackgroundRoutes;
