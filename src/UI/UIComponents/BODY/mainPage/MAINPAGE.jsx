import { useLocation } from "react-router-dom";
import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";
import { useEffect, useState } from "react";
import MainPageImageTwo from "./mainpageImageTwo/mainPageImageTwo";

const MainPage = () => {
  return (
    <div>
      {/* <MainImage /> */
      /*Ellie doesnt like this example */}

      <MainPageImageTwo />
      <MainPageImages />
      <Services />
    </div>
  );
};

export default MainPage;
