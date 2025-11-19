import { Route, Routes, useSearchParams } from "react-router-dom";

import React, { lazy, Suspense, useEffect, useMemo } from "react";

const Home = lazy(() => import("../../../PAGES/home/HOME.jsx"));
const Gallery = lazy(() => import("../../../PAGES/gallery/GALLERY.jsx"));
const PageNotFound = lazy(() =>
  import("../../../PAGENOTFOUND/pageNotFound.jsx")
);
const ContactUs = lazy(() => import("../../../PAGES/contactUs/contactUs.jsx"));

import Loading from "../../../LOADING/loading.jsx";

import useGetLocation from "@hooks/useGetLocation.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

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

  const { data } = useData("gallery");

  const updatedData = dataHandler(data, categories);

  const dataKeys = React.useMemo(() => {
    if (!data) return;

    const flattedData = Object.values(data).flat();

    // find all filter-types in all objects
    const dataKeys = flattedData.map((obj) => {
      const {
        _embedded: {
          details: { set, type },
        },
      } = obj;

      return { set, type };
    });

    const filters = dataKeys.map((obj) => Object.values(obj)).flat();
    const uniqueFilters = [...new Set(filters)].sort().filter((i) => i);

    return uniqueFilters;
  }, [data]);

  // flat data
  // find datakeys (categories to filter by)
  // find each object based on datakeys

  if (!updatedData || !dataKeys) return <Loading />;

  return <Gallery data={{ categories, page, updatedData, dataKeys }} />;
};

const HomeRoute = () => {
  const { data } = useData("home");

  const galleryData = data?.paintings.concat(data?.prints),
    servicesData = data?.services;

  const canLoad = galleryData && servicesData;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!canLoad) return <Loading />;

  return <Home data={{ galleryData, servicesData }} />;
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
