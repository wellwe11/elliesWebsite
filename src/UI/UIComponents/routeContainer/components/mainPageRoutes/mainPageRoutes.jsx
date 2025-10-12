import { Route, Routes } from "react-router-dom";

import { lazy, useEffect, useState } from "react";

import useUpdateDataLogic from "../../hooks/useUpdateDataLogic.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

import { useDataZustand } from "../../routeContainer.jsx";

const Gallery = lazy(() => import("../../../BODY/gallery/GALLERY.jsx"));
const Home = lazy(() => import("../../../BODY/home/HOME.jsx"));
const ContactUs = lazy(() => import("../../../BODY/contactUs/contactUs.jsx"));
const UniqueImage = lazy(() =>
  import("../../../BODY/uniqueImagePage/uniqueImage.jsx")
);
import useGetLocation from "@hooks/useGetLocation.jsx";
import { Suspense } from "react";

const GalleryRoute = () => {
  const { data, prevData, isLoading } = useDataZustand();
  const { category } = useGetParams();

  const dataToRender = isLoading ? prevData : data;

  const { updatedData } = useUpdateDataLogic(category, dataToRender);

  if (!data) return;

  return <Gallery data={updatedData} />;
};

const HomeRoute = () => {
  const { data, prevData, isLoading } = useDataZustand();

  const dataToRender = isLoading ? prevData : data;
  if (!data) return;

  return <Home data={dataToRender} />;
};

const MainPagesRoutes = () => {
  const { state, location } = useGetLocation();
  const { pathname } = useGetLocation();

  return (
    <Suspense fallback={pathname}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
        <Route path="/contact" element={<ContactUs />} />
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
