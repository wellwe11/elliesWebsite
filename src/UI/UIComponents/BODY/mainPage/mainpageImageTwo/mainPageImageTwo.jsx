import classes from "./mainpageImageTwo.module.scss";

import imageExampleOne from "@assets/imageOnWallPlaceholderRepresentation.png";
import imageExampleTwo from "@assets/imageOnWallPlaceholderRepresentationTwo.png";

import blueImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import blueImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import blueImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";

import { useState } from "react";

const ElliesIdea = () => {
  return (
    <div className={classes.elliesClass}>
      <h1>Hello I am ellie</h1>
    </div>
  );
};

const MainPageImageTwo = () => {
  return (
    <div className={classes.MainPageImageTwo}>
      <ElliesIdea />
      <div className={classes.imagesContainer}>
        <img className={classes.imageExample} src={blueImageTwo} alt="" />
        <img className={classes.imageExample} src={blueImageOne} alt="" />
        <img className={classes.imageExample} src={blueImageThree} alt="" />
        {/* <img className={classes.imageExample} src={imageExampleOne} alt="" /> */}
      </div>
    </div>
  );
};

export default MainPageImageTwo;
