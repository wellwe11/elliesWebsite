import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";

const ScreenContainer = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.widthContainer}>
        <Navbar />
        <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/uniqueImage" element={<UniqueImage />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
};

export default ScreenContainer;
