import { Route, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("../../../PAGES/home/HOME.jsx"));
const Gallery = lazy(() => import("../../../PAGES/gallery/GALLERY.jsx"));

import ContactUs from "../../../PAGES/contactUs/contactUs.jsx";
import Loading from "../../../LOADING/loading.jsx";

import bodyNoScroll from "@functions/bodyNoScroll.js";
import useGetLocation from "@hooks/useGetLocation.jsx";

import useData from "@hooks/useData.jsx";
import dataHandler from "../../functions/dataHandler.js";
import PageNotFound from "../../../PAGENOTFOUND/pageNotFound.jsx";
import Navbar from "../../../NAVBAR/navbar.jsx";

const GalleryRoute = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const page = searchParams.get("page");

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

const MainPagesRoutes = () => {
  const { state, location } = useGetLocation();

  useEffect(() => {
    const { enableScroll } = bodyNoScroll();
    enableScroll();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/gallery/:category?/:id?/*"
          element={<GalleryRoute location={location} />}
        />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainPagesRoutes;
