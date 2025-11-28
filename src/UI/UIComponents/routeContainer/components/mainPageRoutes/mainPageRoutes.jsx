import { Route, Routes, useSearchParams } from "react-router-dom";

import React, { lazy, Suspense, useEffect } from "react";

const Home = lazy(() => import("../../../PAGES/home/HOME.jsx"));
const Gallery = lazy(() => import("../../../PAGES/gallery/GALLERY.jsx"));
const PageNotFound = lazy(() =>
  import("../../../PAGENOTFOUND/pageNotFound.jsx")
);
const ContactUs = lazy(() => import("../../../PAGES/contactUs/contactUs.jsx"));

import Loading from "../../../LOADING/loading.jsx";

import useData from "@hooks/useData.jsx";
import dataHandler from "../../functions/dataHandler.js";
import Navbar from "../../../NAVBAR/navbar.jsx";
const Cart = lazy(() => import("../../../CART/cart.jsx"));

const GalleryRoute = () => {
  const [searchParams] = useSearchParams();
  const rawCategories = searchParams.getAll("category");

  const page = searchParams.get("page");

  const stableCategories = React.useMemo(() => {
    if (rawCategories.length > 0) {
      return rawCategories;
    }

    return null;
  }, [rawCategories.join(",")]); // force stableCategories to change only if a stringed version of the original array updates - without join, it will update on each render because each render carries a new array

  // fetch data from generic gallery object
  const { data } = useData("gallery");

  // flat, sort and add id's to objects
  // This will contain products
  const updatedData = dataHandler(data, stableCategories);

  // find all filter-types in all objects
  // This will create filters (based on category)
  const dataKeys = React.useMemo(() => {
    if (!data) return;

    return Object.keys(data);
  }, [data]);

  if (!updatedData || !dataKeys) {
    return <Loading />;
  }

  return (
    <Gallery
      data={{
        categories: stableCategories,
        page,
        updatedData,
        dataKeys,
      }}
    />
  );
};

const HomeRoute = () => {
  const { data } = useData("home");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return <Home data={data} />;
};

const MainPagesRoutes = ({ location, state }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
        <Route path="/" element={<HomeRoute />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainPagesRoutes;
