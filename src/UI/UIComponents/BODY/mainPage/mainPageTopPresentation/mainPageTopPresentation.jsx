import classes from "./mainPageTopPresentation.module.scss";

import LogoWithTextPresentation from "./logoWithTextPresentation/logoWithTextPresentation";
import ControlledImage from "@components/controlledImage/controlledImage";
import { useEffect, useState } from "react";

const MainPageTopPresentation = ({ images, mainImage }) => {
  return (
    <div className={classes.MainPageTopPresentation}>
      <LogoWithTextPresentation images={images} />

      <div className={classes.graciePlaceholderImageWrapper}>
        <div className={classes.mainPageTitleWrapper}>
          <h1 className={classes.mainPageTitle}>Welcome</h1>
        </div>
        <div className={classes.mainImageWrapper}>
          <img className={classes.mainImage} src={mainImage} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
