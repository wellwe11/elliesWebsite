import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";
import tryFetchFn from "@functions/tryFetchFn";

import UniqueImageContext from "../BODY/uniqueImageContext";

const ScreenContainer = () => {
  const [topLayerData, setTopLayerData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [uniqueImage, setUniqueImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const imagesLink = "/API_imitation/images.json";
      const servicesLink = "/API_imitation/services.json";

      const dataImages = await tryFetchFn(imagesLink);
      const dataLink = await tryFetchFn(servicesLink);

      if (dataImages && dataLink) {
        setTopLayerData(dataImages);
        setServiceData(dataLink);
      }
    };
    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.widthContainer}>
        <Navbar />
        <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
          <UniqueImageContext.Provider value={{ uniqueImage, setUniqueImage }}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  topLayerData && serviceData ? (
                    <MainPage
                      topLayerData={topLayerData}
                      serviceData={serviceData}
                    />
                  ) : (
                    <div>Data is loading...</div>
                  )
                }
              />
              <Route path="/uniqueImage" element={<UniqueImage />} />
            </Routes>
          </UniqueImageContext.Provider>
          {/* <Footer /> */}
        </div>
      </div>
    </Suspense>
  );
};

export default ScreenContainer;
