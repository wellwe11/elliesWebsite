import { Route, Routes, useSearchParams } from "react-router-dom";

import React, { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("../../../PAGES/home/HOME.jsx"));
const Gallery = lazy(() => import("../../../PAGES/gallery/GALLERY.jsx"));
const PageNotFound = lazy(() =>
  import("../../../PAGENOTFOUND/pageNotFound.jsx")
);
const ContactUs = lazy(() => import("../../../PAGES/contactUs/contactUs.jsx"));

import Loading from "../../../LOADING/loading.jsx";

import useGetLocation from "@hooks/useGetLocation.jsx";

import useData from "@hooks/useData.jsx";
import dataHandler from "../../functions/dataHandler.js";
import Navbar from "../../../NAVBAR/navbar.jsx";

const GalleryRoute = () => {
  const [searchParams] = useSearchParams();
  const categories =
    searchParams.getAll("category").length > 0
      ? searchParams.getAll("category")
      : null;

  const page = searchParams.get("page");

  // fetch data from generic gallery object
  const { data } = useData("gallery");

  // flat, sort and add id's to objects
  // This will contain products
  const updatedData = dataHandler(data, categories);

  // find all filter-types in all objects
  // This will create filters (based on category)
  const dataKeys = React.useMemo(() => {
    if (!data) return;

    return Object.keys(data);
  }, [data]);

  if (!updatedData || !dataKeys) return <Loading />;

  return <Gallery data={{ categories, page, updatedData, dataKeys }} />;
};

const HomeRoute = () => {
  const { data } = useData("home");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!data) return;

  const { services, ...restData } = data;
  const updatedData = dataHandler(restData, "set"),
    servicesData = data?.services;

  const canLoad = updatedData && servicesData;

  if (!canLoad) return <Loading />;

  return <Home data={{ updatedData, servicesData }} />;
};

const MainPagesRoutes = () => {
  const { state, location } = useGetLocation();

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
