import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import useData from "@hooks/useData.jsx";

import useUpdateDataLogic from "../../hooks/useUpdateDataLogic.jsx";

import Gallery from "../../../BODY/gallery/GALLERY.jsx";
import Home from "../../../BODY/home/HOME.jsx";
import ContactUs from "../../../BODY/contactUs/contactUs.jsx";
import UniqueImage from "../../../BODY/uniqueImagePage/uniqueImage.jsx";

const GalleryRoute = () => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null;

  const { data, isLoading } = useData("gallery");
  const { updatedData } = useUpdateDataLogic(category, data);
  if (isLoading) return null;

  return <Gallery data={updatedData} />;
};

const HomeRoute = () => {
  const { data, isLoading } = useData("home");

  if (isLoading) return null; // loading screen in future

  return <Home data={data} />;
};

const UniqueImageRoute = () => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("id") || null;

  const { data, isLoading } = useData("gallery");

  if (isLoading) return null;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const embedded = foundObj?._embedded;

  return <UniqueImage data={foundObj} info={embedded} />;
};

const MainPagesRoutes = () => {
  const location = useLocation(),
    state = location.state;

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
      <Route path="/contact" element={<ContactUs />} />

      {/** Extended pages */}
      <Route
        path="/uniqueImage/:category?/:id?/*"
        element={<UniqueImageRoute />}
      />
    </Routes>
  );
};

export default MainPagesRoutes;
