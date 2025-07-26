import classes from "./mainPageTopPresentation.module.scss";

import LogoWithTextPresentation from "./logoWithTextPresentation/logoWithTextPresentation";

import imageExampleOne from "@assets/imageOnWallPlaceholderRepresentation.png";
import imageExampleTwo from "@assets/imageOnWallPlaceholderRepresentationTwo.png";

import blueImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import blueImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import blueImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";

import graciePlaceholderImage from "@assets/somePLaceholder.webp";

import logoImage from "@assets/logo.png";

import { useState } from "react";

const MainPageTopPresentation = ({ images }) => {
  return (
    <div className={classes.MainPageTopPresentation}>
      <LogoWithTextPresentation images={images} />
      {/* <div className={classes.imagesContainer}>
        <img className={classes.imageExample} src={blueImageTwo} alt="" />
        <img className={classes.imageExample} src={blueImageOne} alt="" />
        <img className={classes.imageExample} src={blueImageThree} alt="" />
      </div> */}

      <div className={classes.graciePlaceholderImageWrapper}>
        <img
          className={classes.graciePlaceholderImage}
          src={graciePlaceholderImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
