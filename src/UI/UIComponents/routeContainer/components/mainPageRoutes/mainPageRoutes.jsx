import { Route, Routes } from "react-router-dom";
import useData from "@hooks/useData.jsx";

import useUpdateDataLogic from "../../hooks/useUpdateDataLogic.jsx";
import useGetParams from "@hooks/useGetParams.jsx";

import Gallery from "../../../BODY/gallery/GALLERY.jsx";
import Home from "../../../BODY/home/HOME.jsx";
import ContactUs from "../../../BODY/contactUs/contactUs.jsx";
import UniqueImage from "../../../BODY/uniqueImagePage/uniqueImage.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import { useLayoutEffect } from "react";

const GalleryRoute = ({ setIsLoading, setIsError }) => {
  const { category } = useGetParams();
  const { data, isLoading } = useData("gallery");
  const { updatedData } = useUpdateDataLogic(category, data);

  useLayoutEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  if (!data) return null;

  return <Gallery data={updatedData} />;
};

const HomeRoute = ({ setIsLoading, setIsError }) => {
  const { data, isLoading } = useData("home");

  useLayoutEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  if (!data) return null;

  return <Home data={data} />;
};

const UniqueImageRoute = ({ setIsLoading, setIsError }) => {
  const { category, id } = useGetParams();

  const { data, isLoading } = useData("gallery");

  useLayoutEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  if (isLoading) return null;

  const categoryData = data[category],
    foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const embedded = foundObj?._embedded;

  return <UniqueImage data={foundObj} info={embedded} />;
};

const MainPagesRoutes = ({ setIsLoading, setIsError, pageLoadedLocation }) => {
  const { state, location } = useGetLocation();

  console.log(pageLoadedLocation);

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route
        path="/"
        element={
          <HomeRoute setIsLoading={setIsLoading} setIsError={setIsError} />
        }
      />
      <Route
        path="/gallery/:category?/:id?/*"
        element={
          <GalleryRoute setIsLoading={setIsLoading} setIsError={setIsError} />
        }
      />
      <Route
        path="/contact"
        element={
          <ContactUs setIsLoading={setIsLoading} setIsError={setIsError} />
        }
      />

      <Route
        path="/uniqueImage/:category?/:id?/*"
        element={<UniqueImageRoute />}
      />
    </Routes>
  );
};

export default MainPagesRoutes;
