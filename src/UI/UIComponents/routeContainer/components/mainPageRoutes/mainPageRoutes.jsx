import { Route, Routes } from "react-router-dom";
import useData from "@hooks/useData.jsx";

import useUpdateDataLogic from "../../hooks/useUpdateDataLogic.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

import Gallery from "../../../BODY/gallery/GALLERY.jsx";
import Home from "../../../BODY/home/HOME.jsx";
import ContactUs from "../../../BODY/contactUs/contactUs.jsx";
import UniqueImage from "../../../BODY/uniqueImagePage/uniqueImage.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";

const GalleryRoute = () => {
  const { category } = useGetParams();
  const { data, isLoading } = useData("gallery");
  const { updatedData } = useUpdateDataLogic(category, data);

  if (isLoading) return;

  return <Gallery data={updatedData} />;
};

const HomeRoute = () => {
  const { data, isLoading } = useData("home");

  if (isLoading) return;

  return <Home data={data} />;
};

const MainPagesRoutes = () => {
  const { state, location } = useGetLocation();

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
};

export default MainPagesRoutes;

// const UniqueImageRoute = () => {
//   const { category, id } = useGetParams();
//   const { data, isLoading } = useData("gallery");

//   if (isLoading) return "";

//   const categoryData = data[category],
//     foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

//   const embedded = foundObj._embedded;

//   return <UniqueImage data={foundObj} info={embedded} />;
// };

// <Route path="/uniqueImage/:category?/:id?/*" element={<UniqueImageRoute />} />;
