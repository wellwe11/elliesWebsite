import classes from "./mainPageTopPresentation.module.scss";

import LogoWithTextPresentation from "./logoWithTextPresentation/logoWithTextPresentation";

import imageExampleOne from "@assets/imageOnWallPlaceholderRepresentation.png";
import imageExampleTwo from "@assets/imageOnWallPlaceholderRepresentationTwo.png";

import blueImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import blueImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import blueImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";

import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import logoImage from "@assets/logo.png";

import { useState } from "react";

const MainPageTopPresentation = () => {
  const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];

  return (
    <div className={classes.MainPageImageTwo}>
      <LogoWithTextPresentation images={smallCircleImages} />
      <div className={classes.imagesContainer}>
        <img className={classes.imageExample} src={blueImageTwo} alt="" />
        <img className={classes.imageExample} src={blueImageOne} alt="" />
        <img className={classes.imageExample} src={blueImageThree} alt="" />
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
