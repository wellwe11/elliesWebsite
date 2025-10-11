import { Route, Routes } from "react-router-dom";

import { lazy } from "react";

import useUpdateDataLogic from "../../hooks/useUpdateDataLogic.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

const Gallery = lazy(() => import("../../../BODY/gallery/GALLERY.jsx"));
const Home = lazy(() => import("../../../BODY/home/HOME.jsx"));
const ContactUs = lazy(() => import("../../../BODY/contactUs/contactUs.jsx"));
const UniqueImage = lazy(() =>
  import("../../../BODY/uniqueImagePage/uniqueImage.jsx")
);
import useGetLocation from "@hooks/useGetLocation.jsx";
import { Suspense } from "react";

const GalleryRoute = ({ data }) => {
  const { category } = useGetParams();

  const { updatedData } = useUpdateDataLogic(category, data);

  if (data) return null;

  return <Gallery data={updatedData} />;
};

const HomeRoute = ({ data }) => {
  if (!data) return null;

  return <Home data={data} />;
};

const MainPagesRoutes = ({ data }) => {
  const { state, location } = useGetLocation();
  const { pathname } = useGetLocation();

  return (
    <Suspense fallback={pathname}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomeRoute data={data} />} />
        <Route
          path="/gallery/:category?/:id?/*"
          element={<GalleryRoute data={data} />}
        />
        <Route path="/contact" element={<ContactUs setTab={null} />} />
      </Routes>
    </Suspense>
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
