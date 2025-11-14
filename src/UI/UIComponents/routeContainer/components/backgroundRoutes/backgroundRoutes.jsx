import { Route, Routes } from "react-router-dom";
import useData from "@hooks/useData.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";

import Preview from "../../../PAGES/preview/preview.jsx";
import Cart from "../../../PAGES/cart/cart.jsx";

const PreviewRoute = ({ search }) => {
  const { data, isLoading } = useData("gallery");

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");
  const id = searchParams.get("id");

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

  console.log(location);

  return (
    <>
      <Routes location={location}>
        <Route path="/:tab?/cart" element={<Cart />} />
      </Routes>

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
