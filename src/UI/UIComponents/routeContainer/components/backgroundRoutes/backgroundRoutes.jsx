import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import useData from "@hooks/useData.jsx";
import useGetParams from "@hooks/useGetParams.jsx";
import dataHandler from "../../functions/dataHandler.js";

const Preview = lazy(() => import("../../../PAGES/preview/preview.jsx"));

const PreviewRoute = () => {
  const { category, id, otherGet } = useGetParams("child");
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const { data, isLoading } = useData(
    backgroundLocation === "/" ? "home" : "gallery"
  );

  if (!data) return;

  const updatedData = dataHandler(data, category);

  const idToFind = otherGet ? `${id}&child=${otherGet}` : id;

  const foundObj = updatedData.find((a) => a.id === idToFind);

  return <Preview isLoading={isLoading} obj={foundObj} />;
};

const BackgroundRoutes = () => {
  const location = useLocation();

  if (!location.state) return;

  return (
    <Routes location={location}>
      <Route path="/:tab?/preview/*" element={<PreviewRoute />} />
    </Routes>
  );
};

export default BackgroundRoutes;
