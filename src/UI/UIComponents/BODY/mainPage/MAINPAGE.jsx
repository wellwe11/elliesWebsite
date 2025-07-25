import classes from "./MAINPAGE.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import MainImage from "./mainpageImage/mainImage";
import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";

const MainPage = () => {
  return (
    <div>
      {/* <MainImage /> */
      /*Ellie doesnt like this example */}

      <MainPageTopPresentation />
      <MainPageImages />
      <Services />
    </div>
  );
};

export default MainPage;
