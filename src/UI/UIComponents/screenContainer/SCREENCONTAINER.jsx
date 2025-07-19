import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import classes from "./SCREENCONTAINER.module.scss";
import MainPage from "../BODY/mainPage/MAINPAGE";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

const ScreenContainer = ({ children }) => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={classes.widthContainer}>
          <Navbar />
          <div className={classes.contentWrapper}>
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
};

export default ScreenContainer;
