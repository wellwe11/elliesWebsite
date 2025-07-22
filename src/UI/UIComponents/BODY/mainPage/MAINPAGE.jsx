import { useLocation } from "react-router-dom";
import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";
import { useEffect, useState } from "react";

const MainPage = () => {
  return (
    <div>
      <MainImage />
      <MainPageImages />
      <Services />
    </div>
  );
};

export default MainPage;
