import { Route, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("../../../PAGES/home/HOME.jsx"));
const Gallery = lazy(() => import("../../../PAGES/gallery/GALLERY.jsx"));
const UniqueImage = lazy(() =>
  import("../../../PAGES/uniqueImagePage/uniqueImage.jsx")
);

import ContactUs from "../../../PAGES/contactUs/contactUs.jsx";
import Loading from "../../../LOADING/loading.jsx";

import useGetLocation from "@hooks/useGetLocation.jsx";
import useGetParams from "@hooks/useGetParams.jsx";
import useData from "@hooks/useData.jsx";
import dataHandler from "../../functions/dataHandler.js";
import PageNotFound from "../../../PAGENOTFOUND/pageNotFound.jsx";
import Navbar from "../../../NAVBAR/navbar.jsx";
import bodyNoScroll from "../../../../../abstract/functions/bodyNoScroll.js";

const GalleryRoute = () => {
  const { category, page } = useGetParams();

  const { data } = useData("gallery");

  const updatedData = dataHandler(data, category);

  if (!updatedData) return <Loading />;

  return <Gallery data={{ category, page, updatedData }} />;
};

const HomeRoute = () => {
  const { data } = useData("home");

  const paintingsData = data?.paintings,
    printsData = data?.prints,
    servicesData = data?.services;

  const canLoad = paintingsData && printsData && servicesData;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!canLoad) return <Loading />;

  return <Home data={{ paintingsData, printsData, servicesData }} />;
};

const UniqueImageRoute = () => {
  const { category, id } = useGetParams();

  const { data } = useData("gallery");

  if (!data) return <Loading />;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id), // finds matching obj
    info = foundObj._embedded;

  return <UniqueImage data={{ foundObj, info }} />;
};

const MainPagesRoutes = () => {
  const { state, location } = useGetLocation();

  const { enableScroll } = bodyNoScroll();

  //
  useEffect(() => {
    enableScroll();
  }, [enableScroll]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/uniqueImage/:category?/:id?/*"
          element={<UniqueImageRoute />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainPagesRoutes;
